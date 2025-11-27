import { Articulo } from "./inventory.model.ts";
import { PriceBuilder } from "../../../core/builders/price.builder.ts";
import { TaxBuilder } from "../taxes/tax.builder.ts";
import { Tax } from "../taxes/tax.model.ts";
import { Venta } from "../sales/sale.model.ts";
import { Logger } from "../../shared/utils/logger.ts";
import { roundToTwoDecimals } from "../../shared/utils/math.ts";
import {
  InsufficientStockError,
  ArticuloNotFoundError,
  InventoryHistoryError,
} from "../../shared/errors/inventory-errors.ts";
import {
  getStatusByStock,
  StockMovementReason,
} from "../../shared/constants/inventory-estatus.ts";

interface ProductoHistorial {
  articuloId: number;
  stockAnterior: number;
  stockNuevo: number;
  cantidadVendida: number;
  precioUnitario: number;
  precioTotalSinImpuesto: number;
  impuestos: Record<string, unknown>;
  precioFinal: number;
  razonMovimiento: string;
}

export class InventoryService {
  /**
   * Resta el stock de un artículo y calcula el precio final con impuestos
   * @param articuloId - ID del artículo
   * @param quantity - Cantidad a restar
   * @returns Artículo actualizado
   * @throws Error si el artículo no existe o no hay stock suficiente
   */
  public async subtractStock(
    articuloId: number,
    quantity: number
  ): Promise<{ articulo: Articulo; precioFinal: number; impuestos: Record<string, unknown> }> {
    Logger.debug("Starting stock subtraction", { articuloId, quantity });
    
    const articulo = await Articulo.findByPk(articuloId);

    if (!articulo) {
      Logger.error("Articulo not found", new Error(`Articulo ${articuloId} not found`));
      throw new ArticuloNotFoundError(articuloId);
    }

    if (articulo.stock < quantity) {
      Logger.warn("Insufficient stock", {
        articuloId,
        requested: quantity,
        available: articulo.stock,
      });
      throw new InsufficientStockError(
        articuloId,
        quantity,
        articulo.stock
      );
    }

    const stockAnterior = articulo.stock;
    articulo.stock -= quantity;
    
    // Actualizar estado del artículo basado en stock
    const newStatus = getStatusByStock(articulo.stock);
    Logger.debug("Stock updated", {
      articuloId,
      oldStock: stockAnterior,
      newStock: articulo.stock,
      newStatus,
    });
    
    await articulo.save();

    // Obtener todos los impuestos de la base de datos
    Logger.debug("Fetching taxes from database");
    const taxes = await Tax.findAll();

    // Crear el TaxBuilder y agregar los impuestos
    const taxBuilder = new TaxBuilder();
    taxes.forEach((tax: Tax) => {
      taxBuilder.addCustomTax(tax.name, Number(tax.percentage));
    });

    // Crear el PriceBuilder y calcular el precio final
    const priceBuilder = new PriceBuilder(articulo.precio);
    taxes.forEach((tax: Tax) => {
      priceBuilder.addTax(tax.name, Number(tax.percentage));
    });

    const finalPrice = priceBuilder.build();
    const taxConfig = taxBuilder.build();

    // Calcular los montos para el historial
    const precioTotalSinImpuesto = roundToTwoDecimals(
      articulo.precio * quantity
    );

    Logger.debug("Price calculated", {
      basePrice: articulo.precio,
      quantity,
      finalPrice,
      taxConfiguration: taxConfig,
    });

    // Crear registro en Venta
    await Venta.create({
      articuloId: articulo.id,
      quantity,
      precioFinal: finalPrice,
    });

    // Crear registro en historial
    const historial: ProductoHistorial = {
      articuloId: articulo.id,
      stockAnterior,
      stockNuevo: articulo.stock,
      cantidadVendida: quantity,
      precioUnitario: articulo.precio,
      precioTotalSinImpuesto,
      impuestos: taxConfig,
      precioFinal: finalPrice,
      razonMovimiento: StockMovementReason.VENTA,
    };

    // Guardar en la tabla de historial si existe
    try {
      const sequelize = articulo.sequelize;
      await sequelize?.query(
        `INSERT INTO "ProductoHistorial" 
        ("articuloId", "stockAnterior", "stockNuevo", "cantidadVendida", 
         "precioUnitario", "precioTotalSinImpuesto", "impuestos", "precioFinal", "razonMovimiento", "createdAt")
        VALUES (:articuloId, :stockAnterior, :stockNuevo, :cantidadVendida, 
                :precioUnitario, :precioTotalSinImpuesto, :impuestos, :precioFinal, :razonMovimiento, NOW())`,
        {
          replacements: {
            articuloId: historial.articuloId,
            stockAnterior: historial.stockAnterior,
            stockNuevo: historial.stockNuevo,
            cantidadVendida: historial.cantidadVendida,
            precioUnitario: historial.precioUnitario,
            precioTotalSinImpuesto: historial.precioTotalSinImpuesto,
            impuestos: JSON.stringify(historial.impuestos),
            precioFinal: historial.precioFinal,
            razonMovimiento: historial.razonMovimiento,
          },
        }
      );
      Logger.info("Stock subtraction completed successfully", {
        articuloId,
        quantity,
        finalPrice,
      });
    } catch (error) {
      Logger.error("Error saving to ProductoHistorial", error);
      throw new InventoryHistoryError(
        error instanceof Error ? error.message : String(error)
      );
    }

    return {
      articulo,
      precioFinal: finalPrice,
      impuestos: taxConfig,
    };
  }
}

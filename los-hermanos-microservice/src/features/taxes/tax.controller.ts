import { Request, Response } from "express";
import { Tax } from "./tax.model.ts";
import { TaxBuilder } from "./tax.builder.ts";
import { Logger } from "../../shared/utils/logger.ts";
import { formatCurrency, formatPercentage } from "../../shared/utils/formatters.ts";
import {
  InvalidTaxPercentageError,
  TaxNotFoundError,
  DuplicateTaxNameError,
  InvalidTaxNameError,
} from "../../shared/errors/tax-errors.ts";
import {
  TAX_VALIDATION,
} from "../../shared/constants/tax-types.ts";

export class TaxController {
  /**
   * Obtiene todos los impuestos
   */
  public async getAllTaxes(_req: Request, res: Response): Promise<void> {
    try {
      Logger.info("Fetching all taxes");
      const taxes = await Tax.findAll();
      Logger.debug("Taxes fetched successfully", { count: taxes.length });
      res.status(200).json({
        success: true,
        data: taxes,
      });
    } catch (error) {
      Logger.error("Error fetching taxes", error);
      throw error;
    }
  }

  /**
   * Obtiene un impuesto por ID
   */
  public async getTaxById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      Logger.debug("Fetching tax by ID", { id });
      const tax = await Tax.findByPk(id);

      if (!tax) {
        Logger.warn("Tax not found", { id });
        throw new TaxNotFoundError(parseInt(id));
      }

      Logger.info("Tax fetched successfully", { id });
      res.status(200).json({
        success: true,
        data: tax,
      });
    } catch (error) {
      Logger.error("Error fetching tax", error);
      throw error;
    }
  }

  /**
   * Crea un nuevo impuesto
   */
  public async createTax(req: Request, res: Response): Promise<void> {
    try {
      const { name, percentage, description } = req.body;

      if (!name || typeof name !== "string") {
        Logger.warn("Invalid tax name provided");
        throw new InvalidTaxNameError(name);
      }

      if (
        typeof percentage !== "number" ||
        !this.isValidPercentage(percentage)
      ) {
        Logger.warn("Invalid tax percentage provided", { percentage });
        throw new InvalidTaxPercentageError(percentage);
      }

      const existingTax = await Tax.findOne({ where: { name } });
      if (existingTax) {
        Logger.warn("Duplicate tax name", { name });
        throw new DuplicateTaxNameError(name);
      }

      Logger.debug("Creating new tax", { name, percentage });
      const tax = await Tax.create({
        name,
        percentage,
        description: description || null,
      });

      Logger.info("Tax created successfully", { taxId: tax.id, name });
      res.status(201).json({
        success: true,
        data: tax,
      });
    } catch (error) {
      Logger.error("Error creating tax", error);
      throw error;
    }
  }

  /**
   * Actualiza un impuesto
   */
  public async updateTax(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, percentage, description } = req.body;

      Logger.debug("Updating tax", { id });
      const tax = await Tax.findByPk(id);
      if (!tax) {
        Logger.warn("Tax not found for update", { id });
        throw new TaxNotFoundError(parseInt(id));
      }

      if (name && typeof name === "string") {
        tax.name = name;
      } else if (name) {
        throw new InvalidTaxNameError(name);
      }

      if (percentage !== undefined && this.isValidPercentage(percentage)) {
        tax.percentage = percentage;
      } else if (percentage !== undefined) {
        throw new InvalidTaxPercentageError(percentage);
      }

      if (description !== undefined) {
        tax.description = description;
      }

      await tax.save();
      Logger.info("Tax updated successfully", { taxId: id });

      res.status(200).json({
        success: true,
        data: tax,
      });
    } catch (error) {
      Logger.error("Error updating tax", error);
      throw error;
    }
  }

  /**
   * Elimina un impuesto
   */
  public async deleteTax(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      Logger.debug("Deleting tax", { id });

      const tax = await Tax.findByPk(id);
      if (!tax) {
        Logger.warn("Tax not found for deletion", { id });
        throw new TaxNotFoundError(parseInt(id));
      }

      await tax.destroy();
      Logger.info("Tax deleted successfully", { taxId: id });

      res.status(200).json({
        success: true,
        message: "Impuesto eliminado correctamente",
      });
    } catch (error) {
      Logger.error("Error deleting tax", error);
      throw error;
    }
  }

  /**
   * Calcula el precio final con impuestos aplicados
   */
  public async calculatePrice(req: Request, res: Response): Promise<void> {
    try {
      const { basePrice, taxIds } = req.body;

      if (typeof basePrice !== "number" || basePrice < 0) {
        Logger.warn("Invalid base price", { basePrice });
        throw new Error("El precio base debe ser un número positivo");
      }

      Logger.debug("Calculating price with taxes", {
        basePrice,
        taxIds: Array.isArray(taxIds) ? taxIds.length : 0,
      });

      let taxes: Tax[] = [];

      if (Array.isArray(taxIds) && taxIds.length > 0) {
        taxes = await Tax.findAll({
          where: { id: taxIds },
        });
      } else {
        taxes = await Tax.findAll();
      }

      const taxBuilder = new TaxBuilder();
      taxes.forEach((tax) => {
        taxBuilder.addCustomTax(tax.name, Number(tax.percentage));
      });

      const taxConfig = taxBuilder.build();
      const taxMultiplier =
        typeof taxConfig.taxMultiplier === "number"
          ? taxConfig.taxMultiplier
          : 1;
      const finalPrice = parseFloat((basePrice * taxMultiplier).toFixed(2));

      Logger.info("Price calculated successfully", {
        basePrice,
        finalPrice,
        taxMultiplier,
        taxPercentage: formatPercentage(
          (taxMultiplier - 1) * 100,
          2
        ),
      });

      res.status(200).json({
        success: true,
        basePrice,
        taxConfig,
        finalPrice,
        formattedFinalPrice: formatCurrency(finalPrice),
      });
    } catch (error) {
      Logger.error("Error calculating price", error);
      throw error;
    }
  }

  /**
   * Valida si un porcentaje es válido
   */
  private isValidPercentage(percentage: number): boolean {
    return (
      typeof percentage === "number" &&
      percentage >= TAX_VALIDATION.MIN_PERCENTAGE &&
      percentage <= TAX_VALIDATION.MAX_PERCENTAGE
    );
  }
}

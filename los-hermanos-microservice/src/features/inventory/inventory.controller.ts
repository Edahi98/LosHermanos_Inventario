import { InventoryService } from "./inventory.service.ts";
import { InventoryBuilder } from "./inventory.builder.ts";
import { Logger } from "../../shared/utils/logger.ts";
import {
  InsufficientStockError,
  ArticuloNotFoundError,
  InvalidQuantityError,
} from "../../shared/errors/inventory-errors.ts";

interface Request {
  method: string;
  url: string;
  ip?: string;
  body: Record<string, unknown>;
  get: (header: string) => string | undefined;
}

interface Response {
  status(code: number): Response;
  json(data: Record<string, unknown>): void;
}

export class InventoryController {
  private inventoryService: InventoryService;

  constructor() {
    this.inventoryService = new InventoryService();
  }

  /**
   * Resta el stock de un artículo y devuelve el precio con impuestos
   * @param req - Request de Express
   * @param res - Response de Express
   */
  public async subtractStock(req: Request, res: Response): Promise<void> {
    try {
      const { articuloId, quantity } = req.body as {
        articuloId: number;
        quantity: number;
      };

      // Validar entrada
      if (!Number.isInteger(articuloId) || articuloId <= 0) {
        throw new ArticuloNotFoundError(articuloId);
      }

      if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new InvalidQuantityError(quantity);
      }

      Logger.info("Processing stock subtraction", {
        articuloId,
        quantity,
      });

      const result = await this.inventoryService.subtractStock(
        articuloId,
        quantity
      );

      const response = new InventoryBuilder(result.articulo, result.impuestos)
        .build();

      Logger.info("Stock subtraction successful", {
        articuloId,
        precioFinal: result.precioFinal,
      });

      res.status(200).json({
        success: true,
        data: response,
        precioFinal: result.precioFinal,
        impuestos: result.impuestos,
      });
    } catch (error) {
      if (
        error instanceof InsufficientStockError ||
        error instanceof ArticuloNotFoundError ||
        error instanceof InvalidQuantityError
      ) {
        Logger.warn("Validation error in subtractStock", {
          message: error instanceof Error ? error.message : String(error),
        });
        throw error;
      }
      Logger.error("Error in subtractStock", error);
      throw error;
    }
  }
}


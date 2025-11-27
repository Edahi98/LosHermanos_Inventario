import { Router, Request, Response } from "express";
import { TaxBuilder } from "./tax.builder.ts";

const router = Router();

/**
 * GET /taxes/calculate
 * Calcula el precio final con impuestos
 * Body: { basePrice: number, taxes: Array<{name: string, percentage: number}> }
 */
router.post("/calculate", (req: Request, res: Response) => {
  try {
    const { basePrice, taxes } = req.body;

    if (typeof basePrice !== "number" || basePrice < 0) {
      res
        .status(400)
        .json({ error: "basePrice debe ser un número positivo" });
      return;
    }

    const taxBuilder = new TaxBuilder();

    if (Array.isArray(taxes)) {
      taxes.forEach(
        (tax: { name: string; percentage: number }) => {
          taxBuilder.addCustomTax(tax.name, tax.percentage);
        }
      );
    }

    const result = taxBuilder.build();
    const taxMultiplier = typeof result.taxMultiplier === "number" ? result.taxMultiplier : 1;
    const finalPrice = basePrice * taxMultiplier;

    res.status(200).json({
      success: true,
      basePrice,
      impuestos: result,
      precioFinal: parseFloat(finalPrice.toFixed(2)),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ success: false, error: errorMessage });
  }
});

/**
 * GET /taxes
 * Obtiene información sobre los impuestos disponibles
 */
router.get("/", (_req: Request, res: Response) => {
  try {
    const taxBuilder = new TaxBuilder();
    taxBuilder.addIva(16).addISR(10);

    const taxes = taxBuilder.build();

    res.status(200).json({
      success: true,
      taxes: taxes.taxes,
      totalPercentage: taxes.totalPercentage,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ success: false, error: errorMessage });
  }
});

export default router;

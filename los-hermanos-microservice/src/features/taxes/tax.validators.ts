import { body } from "express-validator";
import { TAX_VALIDATION, TAX_ERROR_MESSAGES } from "../../shared/constants/tax-types.ts";

/**
 * Validadores para la creación de impuestos
 */
export const createTaxValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(TAX_ERROR_MESSAGES.INVALID_NAME)
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),
  body("percentage")
    .isNumeric()
    .withMessage("El porcentaje debe ser un número")
    .custom((value: unknown) => {
      const num = parseFloat(String(value));
      if (num < TAX_VALIDATION.MIN_PERCENTAGE || num > TAX_VALIDATION.MAX_PERCENTAGE) {
        throw new Error(TAX_ERROR_MESSAGES.INVALID_PERCENTAGE);
      }
      return true;
    }),
  body("description").optional().isString().withMessage("La descripción debe ser una cadena de texto"),
];

/**
 * Validadores para la actualización de impuestos
 */
export const updateTaxValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage(TAX_ERROR_MESSAGES.INVALID_NAME)
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),
  body("percentage")
    .optional()
    .isNumeric()
    .withMessage("El porcentaje debe ser un número")
    .custom((value: unknown) => {
      const num = parseFloat(String(value));
      if (num < TAX_VALIDATION.MIN_PERCENTAGE || num > TAX_VALIDATION.MAX_PERCENTAGE) {
        throw new Error(TAX_ERROR_MESSAGES.INVALID_PERCENTAGE);
      }
      return true;
    }),
  body("description").optional().isString().withMessage("La descripción debe ser una cadena de texto"),
];

/**
 * Validadores para el cálculo de precios
 */
export const calculatePriceValidator = [
  body("basePrice")
    .isNumeric()
    .withMessage("El precio base debe ser un número")
    .custom((value: unknown) => {
      const num = parseFloat(String(value));
      if (num < 0) {
        throw new Error("El precio base no puede ser negativo");
      }
      return true;
    }),
  body("taxIds")
    .optional()
    .isArray()
    .withMessage("Los IDs de impuestos deben ser un array"),
];

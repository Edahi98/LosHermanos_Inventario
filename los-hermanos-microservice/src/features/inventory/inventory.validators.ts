import { body } from "express-validator";

export const subtractStockValidator = [
  body("articuloId").isNumeric().withMessage("articuloId must be a number"),
  body("quantity").isNumeric().withMessage("quantity must be a number"),
];

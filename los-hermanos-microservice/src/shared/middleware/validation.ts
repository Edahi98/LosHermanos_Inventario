import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * Middleware para manejar los errores de validación
 */
export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array(),
    });
    return;
  }

  next();
};

/**
 * Middleware para validar que el cuerpo de la solicitud no esté vacío
 */
export const validateBody =
  (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({
        success: false,
        error: "El cuerpo de la solicitud no puede estar vacío",
      });
      return;
    }

    next();
  };

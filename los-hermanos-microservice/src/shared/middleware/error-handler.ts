import { Request, Response, NextFunction } from "express";
import { Logger } from "../utils/logger.ts";
import { isTaxError } from "../errors/tax-errors.ts";
import { isInventoryError } from "../errors/inventory-errors.ts";
import process from "node:process";

/**
 * Middleware para manejar errores globales
 */
export const errorHandler = (
  err: Error | unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  Logger.error("Request error", err, {
    method: req.method,
    url: req.url,
    ip: req.ip,
  });

  // Determinar el estado y mensaje de error
  let status = 500;
  let message = "Internal Server Error";
  let code = "INTERNAL_ERROR";

  if (isTaxError(err)) {
    status = err.statusCode;
    message = err.message;
    code = err.code;
  } else if (isInventoryError(err)) {
    status = err.statusCode;
    message = err.message;
    code = err.code;
  } else if (err instanceof Error) {
    message = process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message;
  }

  res.status(status).json({
    success: false,
    error: message,
    code,
    ...(process.env.NODE_ENV !== "production" && {
      stack: err instanceof Error ? err.stack : undefined,
    }),
  });
};

export default errorHandler;

import { Request, Response, NextFunction } from "express";
import { Logger } from "../utils/logger.ts";

export const logging = (req: Request, res: Response, next: NextFunction) => {
  Logger.httpRequest(req, req.method, `Incoming ${req.method} request`);
  
  const originalJson = res.json.bind(res);
  res.json = function (data: unknown) {
    Logger.httpResponse(res.statusCode, `Response sent with status ${res.statusCode}`);
    return originalJson(data);
  };
  
  next();
};

export default logging;

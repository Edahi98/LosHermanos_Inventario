/**
 * Tipos para Express que no requieren dependencias externas
 * Compatible con Deno
 */

export interface Request {
  method: string;
  url: string;
  ip?: string;
  body: Record<string, unknown>;
  get: (header: string) => string | undefined;
  params: Record<string, string>;
  query: Record<string, string | string[]>;
}

export interface Response {
  status(code: number): Response;
  json(data: Record<string, unknown> | unknown): void;
  send(data: string | Record<string, unknown>): void;
}

export interface NextFunction {
  (err?: Error | unknown): void;
}

export interface Router {
  get(path: string, ...handlers: Array<(req: Request, res: Response) => void | Promise<void>>): void;
  post(path: string, ...handlers: Array<(req: Request, res: Response) => void | Promise<void>>): void;
  put(path: string, ...handlers: Array<(req: Request, res: Response) => void | Promise<void>>): void;
  delete(path: string, ...handlers: Array<(req: Request, res: Response) => void | Promise<void>>): void;
}

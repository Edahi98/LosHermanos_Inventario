import { console } from "node:inspector";
import process from "node:process";

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
}

interface Request {
  method: string;
  url: string;
  ip?: string;
  get: (header: string) => string | undefined;
}

export class Logger {
  private static isDevelopment = process.env.NODE_ENV !== "production";

  static log(level: LogLevel, message: string, data?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(data && { data }),
    };

    this.formatAndPrint(entry);
  }

  static debug(message: string, data?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      this.log(LogLevel.DEBUG, message, data);
    }
  }

  static info(message: string, data?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, data);
  }

  static warn(message: string, data?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, data);
  }

  static error(message: string, error?: Error | unknown, data?: Record<string, unknown>): void {
    const errorData: Record<string, unknown> = {
      ...data,
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
    };
    this.log(LogLevel.ERROR, message, errorData);
  }

  private static formatAndPrint(entry: LogEntry): void {
    const color = this.getColorByLevel(entry.level);
    const prefix = `[${entry.timestamp}] [${entry.level}]`;

    if (this.isDevelopment) {
      console.log(`${color}${prefix} ${entry.message}`, entry.data || "");
    } else {
      console.log(JSON.stringify(entry));
    }
  }
  private static getColorByLevel(level: LogLevel): string {
    const colors: Record<LogLevel, string> = {
      [LogLevel.DEBUG]: "\x1b[36m", // Cyan
      [LogLevel.INFO]: "\x1b[32m", // Green
      [LogLevel.WARN]: "\x1b[33m", // Yellow
      [LogLevel.ERROR]: "\x1b[31m", // Red
    };
    return colors[level];
  }

  static httpRequest(req: Request, method: string, message: string): void {
    this.info(message, {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get("user-agent"),
      customMethod: method,
    });
  }

  static httpResponse(
    statusCode: number,
    message: string,
    data?: Record<string, unknown>,
  ): void {
    const level = statusCode >= 400 ? LogLevel.WARN : LogLevel.INFO;
    this.log(level, message, {
      statusCode,
      ...data,
    });
  }
}

export default Logger;
import winston from "winston";

import { IS_DEV } from "../config/enviroment";

export type LoggerConfig = {
  saveOnlyFile?: boolean;
};

export type LoggerType = "debug" | "info" | "warn" | "error";

export default class Logger {
  private static instance: winston.Logger;

  public static generate(config?: LoggerConfig) {
    const transport = new winston.transports.File({
      filename: "warn.log",
      dirname: "logs",
      zippedArchive: true,
      maxsize: 1024 * 1024 * 20,
      maxFiles: Infinity,
    });

    const level = IS_DEV ? "debug" : "info";

    const format = winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    );

    const transports: winston.transport[] = [transport];

    if (!config?.saveOnlyFile) {
      transports.push(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        })
      );
    }

    const logger = winston.createLogger({
      level,
      format,
      transports,
    });

    return logger;
  }

  public static getInstance(config?: LoggerConfig): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = Logger.generate(config);
    }

    return Logger.instance;
  }

  public static info(...message: string[]): void;
  public static info(name: string, ...messages: string[]): void;
  public static info(message: string | string[], ...messages: string[]): void {
    if (messages.length) {
      Logger.getInstance().info(`${message}: ${messages.join(" ")}`);

      return;
    }

    if (Array.isArray(message)) {
      Logger.getInstance().info(`${message.join(" ")}`);

      return;
    }

    Logger.getInstance().info(message);
  }

  public static error(message: string): void;
  public static error(name: string, error: unknown): void;
  public static error(name: string, ...messages: string[]): void;
  public static error(
    message: string,
    error?: Error | string | string[]
  ): void {
    if (error instanceof Error) {
      Logger.getInstance().error(
        `${message}: ${error.message}\n${error.stack}`
      );

      return;
    }

    if (Array.isArray(message)) {
      Logger.getInstance().error(`${message}: ${message.join(" ")}`);

      return;
    }

    if (typeof error === "string") {
      Logger.getInstance().error(`${message}: ${error}`);

      return;
    }

    Logger.getInstance().error(message);
  }

  public static warn(...messages: string[]): void {
    Logger.getInstance().warn(messages.join(" "));
  }

  public static debug(...messages: string[]): void {
    Logger.getInstance().debug(messages.join(" "));
  }

  public static table(
    type: LoggerType,
    message: string,
    table: object,
    after?: string
  ): void {
    Logger.getInstance()[type](message);

    console.table(table);

    const config: LoggerConfig = {
      saveOnlyFile: true,
    };

    const logger = this.generate(config);
    logger[type](JSON.stringify(table, null, 2));

    if (!after) return;

    Logger.getInstance()[type](after);
  }
}

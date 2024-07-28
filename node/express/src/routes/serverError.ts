import type { Request, Response, NextFunction } from "express";

import Logger, { LoggerType } from "../shared/Logger";
import AppError from "../shared/AppError";

import ResponseHandler from "../handlers/ResponseHandler";

export default function serverErrorRoute(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!(err instanceof Error)) {
    return next();
  }

  let loggerType: LoggerType = "error";
  let resHandler: ResponseHandler;

  if (err instanceof AppError) {
    if (err.status < 500) {
      loggerType = "warn";
    }

    resHandler = ResponseHandler.genHandler(
      res,
      err.code,
      err.status,
      err.message
    );
  } else {
    resHandler = ResponseHandler.genHandler(res, "APP9999", 500);
  }

  const table: object = [
    {
      STATUS: resHandler.status,
      METHOD: req.method,
      CODE: resHandler.code,
      PATH: req.originalUrl,
      MESSAGE: resHandler.message,
    },
  ];

  if (Object.keys(req.params).length) {
    Object.assign(table, { PARAMS: req.params });
  }

  if (Object.keys(req.query).length) {
    Object.assign(table, { QUERY: req.query });
  }

  if (Object.keys(req.body).length) {
    Object.assign(table, {
      BODY: JSON.stringify(req.body),
    });
  }

  Logger.table(loggerType, err.message || resHandler.message, table, err.stack);

  return resHandler.json();
}

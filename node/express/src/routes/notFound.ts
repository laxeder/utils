import type { Request, Response } from "express";

import AppError from "../shared/AppError";

export default function notFoundRoute(req: Request, res: Response) {
  throw new AppError("APP0003", 404);
}

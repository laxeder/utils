import type { Request, Response } from "express";

import ResponseHandler from "../../../handlers/ResponseHandler";

export default function healthRoute(req: Request, res: Response) {
  const date = new Date().toISOString();

  throw new Error("APP0001");

  return ResponseHandler.send(res, "APP0001", 200, date);
}

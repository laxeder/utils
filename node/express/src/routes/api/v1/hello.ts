import type { Request, Response } from "express";

import ResponseHandler from "../../../handlers/ResponseHandler";

export default function helloRoute(req: Request, res: Response) {
  return ResponseHandler.send(res, "APP0002", 200, "Hello World!");
}

import type { Express } from "express";

import express from "express";

import RequestHandler from "../handlers/RequestHandler";
import bodyParser from "body-parser";

export default function createServer(): Express {
  const app = express();

  app.use(bodyParser.json());

  const reqHandler = new RequestHandler(app);

  reqHandler.prepare();

  return app;
}

import { Router } from "express";

import helloRoute from "./api/v1/hello";
import healthRoute from "./api/v1/health";

export function apiV1(): Router {
  const router = Router();

  router.get("/hello", helloRoute);
  router.get("/health", healthRoute);

  return router;
}

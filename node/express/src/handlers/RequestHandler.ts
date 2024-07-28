import type { Express } from "express";

import { apiV1 } from "../routes/router";
import notFoundRoute from "../routes/notFound";
import serverErrorRoute from "../routes/serverError";

export default class RequestHandler {
  public app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  protected prepareRoutes() {
    this.app.use("/api/v1", apiV1());
  }

  protected prepareError() {
    this.app.use(serverErrorRoute);
  }

  protected prepareNotFound() {
    this.app.use(notFoundRoute);
  }

  public prepare() {
      this.prepareRoutes();
      this.prepareNotFound();
      this.prepareError();
  }
}

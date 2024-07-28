import type { Response } from "express";

export default class ResponseHandler {
  public res: Response;

  public status!: number;
  public code!: string;
  public message!: string;
  public data!: any;

  constructor(res: Response) {
    this.res = res;
  }

  protected prepareData() {
    if (this.data) return;

    if (this.status >= 200 && this.status < 300) {
      if (this.status == 204) {
        this.data = undefined;
        return;
      }

      this.data = { success: true };
      return;
    }

    if (this.status >= 400 && this.status < 500) {
      this.data = { success: false };
      return;
    }

    this.data = undefined;
  }

  protected prepareMessageFor200Status() {
    if (this.status == 201) {
      this.message = "Recurso criado com sucesso.";
      return;
    }

    this.message = "Operação realizada com sucesso.";
  }

  protected prepareMessageFor400Status() {
    if (this.status == 400) {
      this.message = "Requisição inválida.";
      return;
    }

    if (this.status === 401) {
      this.message = "Autenticação necessária.";
      return;
    }

    if (this.status == 403) {
      this.message = "Voce não tem permissão para realizar esta operação.";
      return;
    }

    if (this.status == 404) {
      this.message = "Recurso não encontrado.";
      return;
    }

    this.message = "Requisição inválida";
  }

  protected prepareMessageFor500Status() {
    this.message = "Um erro ocorreu internamente. Tente novamente mais tarde.";
  }

  protected prepareMessage() {
    let message = String(this.message);

    if (message == "undefined" || message == "null") {
      message = "";
    }

    if (message) {
      this.message = message;
      return;
    }

    if (this.status > 200 && this.status < 300) {
      this.prepareMessageFor200Status();
      return;
    }

    if (this.status >= 400 && this.status < 500) {
      this.prepareMessageFor400Status();
      return;
    }

    this.prepareMessageFor500Status();
  }

  protected prepareCode() {
    if (this.code) return;

    this.code = "APP0000";
  }

  protected prepareStatus() {
    const status = Number(this.status);

    if (Number.isNaN(status)) {
      this.status = 500;
      return;
    }

    if (status < 100 || status > 599) {
      this.status = 500;
      return;
    }

    this.status = status;
  }

  protected prepare() {
    this.prepareStatus();
    this.prepareCode();
    this.prepareMessage();
    this.prepareData();
  }

  public json() {
    return this.res.json({
      code: this.code,
      status: this.status,
      message: this.message,
      data: this.data,
    });
  }

  public static genHandler(
    res: Response,
    code: string,
    status: number,
    data?: any,
    message?: string
  ) {
    const resHandler = new ResponseHandler(res);

    if (code) resHandler.code = code;
    if (status) resHandler.status = status;

    if (typeof data === "string" && !message) {
      message = data;
      data = undefined;
    } else {
      resHandler.data = data;
    }

    if (message) resHandler.message = message;

    resHandler.prepare();

    resHandler.res.status(resHandler.status);

    return resHandler;
  }

  public static send(res: Response, code: string, status: number): Response;
  public static send(
    res: Response,
    code: string,
    status: number,
    data: object
  ): Response;
  public static send(
    res: Response,
    code: string,
    status: number,
    message: string
  ): Response;
  public static send(
    res: Response,
    code: string,
    status: number,
    data?: any,
    message?: string
  ): Response {
    const resHandler = ResponseHandler.genHandler(
      res,
      code,
      status,
      data,
      message
    );

    return resHandler.json();
  }
}

export default class AppError extends Error {
  public readonly code: string;
  public readonly status: number;

  constructor(code: string, status: number);
  constructor(code: string, message: string | number, status?: number) {
    super();

    this.code = code;

    if (typeof message === "number") {
      this.status = message;
    } else {
      this.status = status || 500;
    }

    if (typeof message === "string") {
      this.message = message;
    }
  }
}

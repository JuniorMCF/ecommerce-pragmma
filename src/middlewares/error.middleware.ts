import { Request, Response, NextFunction } from "express";

class ErrorMiddleware {
  public static handle(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(err);
    res.status(err.status || 500).send({
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    });
  }
  /*   public static async handleError(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  } */
}

export default ErrorMiddleware;

import { Request, Response, NextFunction } from "express";

class ErrorMiddleware {
  public static async handle(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
  public static globalErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(err); // Log del error
    res.status(err.status || 500).send({
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    });
  }
}

export default ErrorMiddleware;

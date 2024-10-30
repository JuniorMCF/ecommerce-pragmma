import { Request, Response, NextFunction } from "express";

class ErrorMiddleware {
  // Método para convertir errores a instancias de ApiError si no lo son
  public static errorConverter(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let handledError = error;

    handledError.stack = error.stack;

    next(handledError);
  }

  // Método para manejar errores y enviar una respuesta JSON estructurada
  public static errorHandler(
    error: Error,
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const { message, stack } = error;

    console.error("Error: ", error);

    res.status(500).json({
      status: "fail",
      message:
        process.env.NODE_ENV === "development" ? message : "Error interno",
      stack: process.env.NODE_ENV === "development" ? stack : undefined,
      data: null,
    });
  }
}

export default ErrorMiddleware;

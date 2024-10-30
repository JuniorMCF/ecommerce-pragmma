// src/core/middlewares/NotFoundMiddleware.ts
import { Request, Response, NextFunction } from "express";

class NotFoundMiddleware {
  public static handle(req: Request, res: Response, next: NextFunction) {
    res.status(404).send({ status: 404, message: "Page not found" });
  }
}

export default NotFoundMiddleware;

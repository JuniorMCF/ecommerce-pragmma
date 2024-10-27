import { Response } from "express";
import { injectable } from "inversify";

@injectable()
export class BaseController {
  protected successResponse(
    res: Response,
    data: any,
    message: string = "Success",
    statusCode: number = 200
  ): void {
    res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  }

  protected errorResponse(
    res: Response,
    message: string = "Error",
    statusCode: number = 400
  ): void {
    res.status(statusCode).json({
      status: "error",
      message,
    });
  }
}

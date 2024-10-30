import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator";

export class CartValidator {
  public static async validateAddToCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    await body("productId")
      .exists()
      .withMessage("Product ID is required.")
      .isString()
      .withMessage("Product ID must be a string.")
      .notEmpty()
      .withMessage("Product ID cannot be empty.")
      .run(req);

    await body("quantity")
      .exists()
      .withMessage("Quantity is required.")
      .isInt({ gt: 0 })
      .withMessage("Quantity must be a positive integer.")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }

  public static async validateRemoveFromCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    await body("productId")
      .exists()
      .withMessage("Product ID is required.")
      .isString()
      .withMessage("Product ID must be a string.")
      .notEmpty()
      .withMessage("Product ID cannot be empty.")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
}

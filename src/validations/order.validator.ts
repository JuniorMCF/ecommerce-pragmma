import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

export class OrderValidator {
  public static async validateCreateOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
   
    await  body("paymentMethod")
      .exists()
      .withMessage("Payment method is required.")
      .isString()
      .withMessage("Payment method must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Payment method cannot be empty.")
      .run(req)
    await body("deliveryMethod")
      .exists()
      .withMessage("Delivery method is required.")
      .isString()
      .withMessage("Delivery method must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Delivery method cannot be empty.")
      .run(req)
   

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }

  public static async validateUpdateOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    await param("orderId")
      .exists()
      .withMessage("Order ID is required.")
      .isString()
      .withMessage("Order ID must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Order ID cannot be empty.")
      .run(req);

    await body("userId")
      .optional()
      .isString()
      .withMessage("User ID must be a string.")
      .trim()
      .notEmpty()
      .withMessage("User ID cannot be empty.")
      .run(req);

    await body("paymentMethod")
      .optional()
      .isString()
      .withMessage("Payment method must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Payment method cannot be empty.")
      .run(req);

    await body("deliveryMethod")
      .optional()
      .isString()
      .withMessage("Delivery method must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Delivery method cannot be empty.")
      .run(req);

    await body("status")
      .optional()
      .isString()
      .withMessage("Status must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Status cannot be empty.")
      .run(req);

    await body("products")
      .optional()
      .isArray()
      .withMessage("Products must be an array.")
      .notEmpty()
      .withMessage("Products cannot be empty.")
      .run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }

  public static async validateOrderId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    await param("orderId")
      .exists()
      .withMessage("Order ID is required.")
      .isString()
      .withMessage("Order ID must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Order ID cannot be empty.")
      .run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
}

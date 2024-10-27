import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

export class ProductValidator {
  public static async validateCreateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    // Validación para creación de producto
    await body("productName")
      .exists()
      .withMessage("Product name is required.")
      .isString()
      .withMessage("Product name must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Product name cannot be empty.")
      .run(req);

    await body("description")
      .exists()
      .withMessage("Description is required.")
      .isString()
      .withMessage("Description must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Description cannot be empty.")
      .run(req);

    await body("price")
      .exists()
      .withMessage("Price is required.")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number.")
      .run(req);

    await body("stock")
      .exists()
      .withMessage("Stock is required.")
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer.")
      .run(req);

    await body("categoryId")
      .exists()
      .withMessage("Category ID is required.")
      .isString()
      .withMessage("Category ID must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Category ID cannot be empty.")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }

  public static async validateUpdateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    await param("productId")
      .exists()
      .withMessage("Product ID is required.")
      .isString()
      .withMessage("Product ID must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Product ID cannot be empty.")
      .run(req);

    await body("productName")
      .optional()
      .isString()
      .withMessage("Product name must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Product name cannot be empty.")
      .run(req);

    await body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Description cannot be empty.")
      .run(req);

    await body("price")
      .optional()
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number.")
      .run(req);

    await body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer.")
      .run(req);

    await body("categoryId")
      .optional()
      .isString()
      .withMessage("Category ID must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Category ID cannot be empty.")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }

  public static async validateProductId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    // Validación de productId
    await param("productId")
      .exists()
      .withMessage("Product ID is required.")
      .isString()
      .withMessage("Product ID must be a string.")
      .trim()
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

import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

export class CategoryValidator {
  public static async validateCreateCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    await body("categoryName")
      .exists()
      .withMessage("Category name is required.")
      .isString()
      .withMessage("Category name must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Category name cannot be empty.")
      .run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }

  public static async validateUpdateCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    await body("categoryName")
      .exists()
      .withMessage("Category name is required.")
      .isString()
      .withMessage("Category name must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Category name cannot be empty.")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }

  public static async validateCategoryId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    await param("categoryId")
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
}

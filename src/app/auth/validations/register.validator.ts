import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator";

export class RegisterValidator {
  public static async validateRegister(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    await body("name")
      .exists()
      .withMessage("Name is required.")
      .isString()
      .withMessage("Name must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Name cannot be empty.")
      .run(req);

    await body("email")
      .exists()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Email must be a valid email address.")
      .trim()
      .notEmpty()
      .withMessage("Email cannot be empty.")
      .run(req);

    await body("password")
      .exists()
      .withMessage("Password is required.")
      .isString()
      .withMessage("Password must be a string.")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long.")
      .notEmpty()
      .withMessage("Password cannot be empty.")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
}

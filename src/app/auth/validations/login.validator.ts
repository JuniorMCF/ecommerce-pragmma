import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator";

export class LoginValidator {
  public static async validateLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    
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

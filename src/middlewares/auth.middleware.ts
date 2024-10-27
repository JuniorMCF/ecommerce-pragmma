import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { cookie } from "express-validator";

export class AuthMiddleware {
  public static async validateAndVerifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    await cookie("token")
      .exists()
      .withMessage("Token is required.")
      .isJWT()
      .withMessage("Token is invalid.")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const token = req.cookies.token;
    const secretKey = process.env.JWT_ACCESS_SECRET || "";

    try {
      const decoded = jwt.verify(token, secretKey);
      (req as any).user = decoded;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Invalid or expired token" }] });
    }
  }
}

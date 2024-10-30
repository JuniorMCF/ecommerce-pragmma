// AuthMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export class AuthMiddleware {
  public static async validateAndVerifyToken(req: Request, res: Response, next: NextFunction): Promise<any> {
    const authHeader = req.headers.authorization;
    const secretKey = process.env.JWT_ACCESS_SECRET || "";

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ errors: [{ msg: "Authorization token is required." }] });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, secretKey) as { id: string };
      req.body.user = { id: decoded.id };
      next();
    } catch (error) {
      return res.status(401).json({ errors: [{ msg: "Invalid or expired token" }] });
    }
  }
}

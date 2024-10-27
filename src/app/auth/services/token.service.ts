import jwt from "jsonwebtoken";
import { ITokenService } from "../contracts/services/itoken.service";
import { injectable } from "inversify";

@injectable()
export class TokenService implements ITokenService {
  private secretKey: string;
  private expiresIn: string;

  constructor(secretKey: string, expiresIn: string) {
    this.secretKey = secretKey;
    this.expiresIn = expiresIn;
  }

  generateToken(userId: string): string {
    const token = jwt.sign({ id: userId }, this.secretKey, {
      expiresIn: this.expiresIn,
    });
    return token;
  }

  verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) {
      return null;
    }
  }
}

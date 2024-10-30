import jwt from "jsonwebtoken";
import { ITokenService } from "../contracts/services/itoken.service";
import { injectable } from "inversify";
import { User } from "../entities/user";

@injectable()
export class TokenService implements ITokenService {
  private secretKey: string;
  private expiresIn: string;

  constructor(secretKey: string, expiresIn: string) {
    this.secretKey = secretKey;
    this.expiresIn = expiresIn;
  }

  generateToken(userId: string): string {
    return jwt.sign({ id: userId }, this.secretKey, { expiresIn: this.expiresIn });
  }

  verifyToken(token: string): User | undefined {
    try {
      const decoded = jwt.verify(token, this.secretKey) as jwt.JwtPayload;
      
      if (decoded && decoded.id) {
        // Retorna una instancia de User con solo el id
        return new User({ id: decoded.id });
      }
      return undefined;
    } catch (error) {
      return undefined;
    }
  }
}

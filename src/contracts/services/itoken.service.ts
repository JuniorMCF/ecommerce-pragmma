import { User } from "../../entities/user";

export interface ITokenService {
  generateToken(userId: string): string;
  verifyToken(token: string): User | undefined;
}

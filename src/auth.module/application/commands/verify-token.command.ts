import { injectable } from "inversify";
import AuthService from "../services/auth.service";
import { User } from "../../domain/entities/user.entity";
import server from "../../../config/app";
import jwt from "jsonwebtoken";

const access_secret = server.jwtAccessToken

@injectable()
export class VerifyTokenCommand {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async execute(token: string): Promise<{ user: User | null }> {

    const userResponse = jwt.verify(token, access_secret, async (err: any, user: any) => {
  
      if( err ) return null;
      const userFound = await this.authService.findUserById(user.id);
      if (!userFound) return null;
      return {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
      }

    })
    return userResponse!;
  }
}

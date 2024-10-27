import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../base.controller";
import AuthService from "../../services/auth.service";
import { IAuthService } from "../../contracts/services/iauth.service";
import { BcryptHashService } from "../../services/hash.service";
import { IHashService } from "../../contracts/services/ihash.service";
import { TokenService } from "../../services/token.service";
import { ITokenService } from "../../contracts/services/itoken.service";
import { ServiceResult } from "../../responses/service-result.dto";
import { User } from "../../entities/user.model";
import { SignInUserDTO } from "../../dtos/signin-user.dto";
import { CreateUserDto } from "../../dtos/create-user.dto";

@injectable()
export class AuthController extends BaseController {
  constructor(
    @inject(AuthService) private authService: IAuthService,
    @inject(BcryptHashService) private hashService: IHashService,
    @inject(TokenService) private tokenService: ITokenService
  ) {
    super();
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const signInUserDto = new SignInUserDTO(email, password);
      const loginResponse: ServiceResult<User> = await this.authService.signIn(
        signInUserDto
      );

      if (loginResponse.isSuccess) {
        return this.successResponse(
          res,
          loginResponse.data,
          loginResponse.message,
          loginResponse.status
        );
      } else {
        return this.errorResponse(
          res,
          loginResponse.message,
          loginResponse.status
        );
      }
    } catch (error:any) {
      throw new Error(error);
    }
  }

  public async registerUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await this.hashService.hash(password);
      const createUserDto = new CreateUserDto(name, email, hashedPassword);

      const registerResponse: ServiceResult<User> =
        await this.authService.signUp(createUserDto);

      if (registerResponse.isSuccess) {
        return this.successResponse(
          res,
          registerResponse.data,
          registerResponse.message,
          registerResponse.status
        );
      } else {
        return this.errorResponse(
          res,
          registerResponse.message,
          registerResponse.status
        );
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async verifyToken(req: Request, res: Response): Promise<void> {
    const { token } = req.cookies;

    try {
      if (!token) return this.errorResponse(res, "Invalid token", 401);

      const isTokenValid = await this.tokenService.verifyToken(token);

      if (!isTokenValid)
        return this.errorResponse(res, "User not found, unauthorized", 401);

      return this.successResponse(res, null, "Token valid", 200);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("token");

      return this.successResponse(res, null, "Logout successful", 200);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

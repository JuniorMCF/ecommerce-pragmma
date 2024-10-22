import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { errorResponse, successResponse } from "../../../shared/response.handler";
import { RegisterUserCommand } from "../../application/commands/register-user.command";
import { LoginCommand } from "../../application/commands/login.command";
import { RegisterValidator } from "../../application/validations/register.validator";
import { LoginValidator } from "../../application/validations/login.validator";
import { VerifyTokenCommand } from "../../application/commands/verify-token.command";

@injectable()
export class AuthController {
  constructor(
    @inject(RegisterUserCommand) private registerUserCommand: RegisterUserCommand,
    @inject(LoginCommand) private loginCommand: LoginCommand,
    @inject(VerifyTokenCommand) private verifyTokenCommand: VerifyTokenCommand,
  ) {}

  public async registerUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    try {
      const validationResult = await RegisterValidator.validateRegister( name, email, password);
      if (!validationResult.valid) return errorResponse(res, validationResult.errors!.join(", "), 400);

      const data = await this.registerUserCommand.execute(name, email, password);
      if (!data) return errorResponse(res, "This email is already registered", 401);

      successResponse(res, data, "User created successfully ", 201);
    }catch (error) {
      console.error("Error creating user:", error);
      errorResponse(res, "Internal Server Error", 500);
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const validationResult = await LoginValidator.validateLogin(email, password);
      if (!validationResult.valid) return errorResponse(res, validationResult.errors!.join(", "), 400);
      
      const { user, token } = await this.loginCommand.execute(email, password);
      if (!user || !token) return errorResponse(res, "Invalid email or password", 401);

      res.cookie('token', token);

      successResponse(res, {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        token: token
      }, "Login successfully", 200);

    }catch (error) {
      console.error("Error login user:", error);
      errorResponse(res, "Internal Server Error", 500);
    }
  }
  
  public async verifyToken(req: Request, res: Response): Promise<void> {
    const { token } = req.cookies;
    try {
      if (!token) return errorResponse(res, "Invalid token", 401);

      const data = await this.verifyTokenCommand.execute(token);
      if (!data) return errorResponse(res, "User not fount, unauthorized", 401);

      successResponse(res, data, "User found", 200);
    }catch (error) {
      console.error("Error creating user:", error);
      errorResponse(res, "Internal Server Error", 500);
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie('token');
      successResponse(res, null, "Logout successful", 200);
    } catch (error) {
      console.error("Error during logout:", error);
      errorResponse(res, "Internal Server Error", 500);
    }
  }
  

}

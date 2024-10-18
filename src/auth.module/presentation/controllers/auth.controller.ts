import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { errorResponse, successResponse } from "../../../shared/response.handler";
import { RegisterUserCommand } from "../../application/commands/register-user.command";
import { LoginCommand } from "../../application/commands/login.command";

@injectable()
export class AuthController {
  constructor(
    @inject(RegisterUserCommand) private registerUserCommand: RegisterUserCommand,
    @inject(LoginCommand) private loginCommand: LoginCommand,
  ) {}

  // Registrar nuevo usuario
  public async registerUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    try {
      const data = await this.registerUserCommand.execute(name, email, password);
      // const token = await createAccessToken(savedUser.insertedId)
      // res.cookie('token', token);
      // res.json({ user: { name: newUser.name, email: newUser.email }, token });
      successResponse(res, data, "User created successfully ", 201);

    }catch (error) {
      console.error("Error creating user:", error);
      errorResponse(res, "Internal Server Error", 500);
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const data = await this.loginCommand.execute(email, password);
      // const token = await createAccessToken(savedUser.insertedId)
      // res.cookie('token', token);
      // res.json({ user: { name: newUser.name, email: newUser.email }, token });
      successResponse(res, data, "Login successfully", 200);

    }catch (error) {
      console.error("Error creating user:", error);
      errorResponse(res, "Internal Server Error", 500);
    }
  }

}

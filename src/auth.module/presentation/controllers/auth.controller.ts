import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../../shared/response.handler";
import { loginCommand } from "../../application/commands/login.command";
import { registerCommand } from "../../application/commands/register.command";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const token = await loginCommand(email, password);

    successResponse(res, { token }, "Login successful");
  } catch (error: any) {
    errorResponse(res, error.message);
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    const newUser = await registerCommand(email, password, name);

    const token = "GENERAR_JWT_AQUÍ";

    successResponse(
      res,
      { user: newUser, token },
      "Registration successful",
      201
    );
  } catch (error: any) {
    // Usamos el helper para manejar el error
    errorResponse(res, error.message);
  }
};

import { injectable } from "inversify";
import AuthService from "../services/auth.service";
import { User } from "../../domain/entities/user.entity";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../../infraestructure/libs/jwt";

@injectable()
export class LoginCommand {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async execute(email: string, password: string): Promise<{ user: User | null; token: string | null }> {
    const userSelected = await this.authService.existingUser(email);

    if (!userSelected) {
      return { user: null, token: null }; // User not found
    }

    const passwordMatch = await bcrypt.compare(password, userSelected.password);
    if (!passwordMatch) {
      return { user: null, token: null }; // Incorrect Password
    }

    const token = await createAccessToken(userSelected.id);
    return { user: userSelected, token: token as string };
  }
}

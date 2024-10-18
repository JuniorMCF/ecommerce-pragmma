import { injectable } from "inversify";
import AuthService from "../services/auth.service";
import { User } from "../../domain/entities/user.entity";
import { LoginUserDto } from "../dtos";
import bcrypt from 'bcryptjs';

@injectable()
export class LoginCommand {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async execute( email: string, password: string ): Promise<User | null> {
    const userDTO = new LoginUserDto({ email, password });
    const userSelected = await this.authService.findUserById(userDTO.email);
    if(!userSelected) return null; //TODO: User not found, return

    const isMatch = await bcrypt.compare(password, userSelected.password);
    if (!isMatch) {
      return null; //TODO: deberia retornar un mensaje que el password es incorrect
    }
    // todo: falta crear el token
    return userSelected as User;
  }
}

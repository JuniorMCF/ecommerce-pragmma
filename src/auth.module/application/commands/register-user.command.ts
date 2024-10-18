import { injectable } from "inversify";
import AuthService from "../services/auth.service";
import { CreateUserDto } from "../dtos/create.user.dto";
import { User } from "../../domain/entities/user.entity";
import bcrypt from 'bcryptjs';

@injectable()
export class RegisterUserCommand {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async execute(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const passwordHashed = await  bcrypt.hash(password, 10); //#223hj4g234hgj23gh4
    const userDTO = new CreateUserDto({
      name,
      email,
      passwordHashed,
    });

    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    
    return await this.authService.registerUser(userDTO);
  }
}

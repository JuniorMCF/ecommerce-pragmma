import { inject, injectable } from "inversify";
import { AuthRepository } from "../repositories/auth.repository";
import { User } from "../models/user.model";
import { CreateUserDto } from "../../../core/types/create-user.dto";
import { IAuthRepository } from "../contracts/repositories/iauth.repository";
import { IAuthService } from "../contracts/services/iauth.service";
import { BcryptHashService } from "./hash.service";
import { IHashService } from "../contracts/services/ihash.service";
import { TokenService } from "./token.service";
import { ITokenService } from "../contracts/services/itoken.service";
import { ServiceResult } from "../../../core/responses/service-result.dto";
import { SignInUserDTO } from "../../../core/types/signin-user.dto";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(AuthRepository) private authRepository: IAuthRepository,
    @inject(BcryptHashService) private hashService: IHashService,
    @inject(TokenService) private tokenService: ITokenService
  ) {}
  async signIn(dto: SignInUserDTO): Promise<ServiceResult<User>> {
    const foundUser = await this.authRepository.findByEmail(dto.email);

    if (!foundUser) {
      return ServiceResult.failure<User>("Invalid email or password","INVALID_CREDENTIALS",400);
    }

    const isPasswordValid = await this.hashService.compare(
      dto.password,
      foundUser.password!
    );

    if (!isPasswordValid) {
      return ServiceResult.failure<User>("Invalid email or password","INVALID_CREDENTIALS",400);
    }

    const token = this.tokenService.generateToken(foundUser.id);

    const loginResponse = new User({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      token: token,
    });

    return ServiceResult.success<User>(loginResponse);
  }

  async signUp(dto: CreateUserDto): Promise<ServiceResult<User>> {
    const existingUser = await this.authRepository.findByEmail(dto.email);

    if (existingUser) {
      return ServiceResult.failure<User>(
        "Email is already registered",
        "USER_ALREADY_EXISTS",
        409
      );
    }

    const user = await this.authRepository.create(dto);

    if (!user) {
      return ServiceResult.failure<User>(
        "Failed to create user",
        "USER_CREATION_FAILED",
        400
      );
    }

    const newUser = new User({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return ServiceResult.success<User>(newUser, "User created successfully",201);
  }

  async findUserByEmail(email: string): Promise<ServiceResult<User>> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      return ServiceResult.notFound<User>("User not found");
    }

    return ServiceResult.success<User>(user, "User found",200);
  }

  async findUserById(id: string): Promise<ServiceResult<User>> {
    const user = await this.authRepository.findById(id);

    if (!user) {
      return ServiceResult.notFound<User>("User not found");
    }

    return ServiceResult.success<User>(user, "User found",200);
  }
}

export default AuthService;

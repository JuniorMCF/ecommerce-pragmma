import { ServiceResult } from "../../responses/service-result.dto";
import { CreateUserDto } from "../../dtos/create-user.dto";
import { SignInUserDTO } from "../../dtos/signin-user.dto";
import { User } from "../../entities/user";

export interface IAuthService {
  signIn(loginUserDto: SignInUserDTO): Promise<ServiceResult<User>>;
  signUp(createUserDto: CreateUserDto): Promise<ServiceResult<User>>;
  findUserById(id: string): Promise<ServiceResult<User>>;
  findUserByEmail(email: string): Promise<ServiceResult<User>>;
}

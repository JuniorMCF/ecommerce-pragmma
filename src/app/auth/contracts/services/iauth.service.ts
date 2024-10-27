import { ServiceResult } from "../../../../core/responses/service-result.dto";
import { CreateUserDto } from "../../../../core/types/create-user.dto";
import { SignInUserDTO } from "../../../../core/types/signin-user.dto";
import { User } from "../../models/user.model";

export interface IAuthService {
  signIn(loginUserDto: SignInUserDTO): Promise<ServiceResult<User>>;
  signUp(createUserDto: CreateUserDto): Promise<ServiceResult<User>>;
  findUserById(id: string): Promise<ServiceResult<User>>;
  findUserByEmail(email: string): Promise<ServiceResult<User>>;
}

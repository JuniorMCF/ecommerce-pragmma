
import { inject, injectable } from "inversify";
import { MongoAuthRepository } from "../../infraestructure/repositories/mongo-auth.repository";
import { User } from "../../domain/entities/user.entity";
import { CreateUserDto } from "../dtos/create.user.dto";
import { LoginUserDto } from "../dtos";

@injectable()
export class AuthService {
  constructor(
    @inject(MongoAuthRepository) private authRepository: MongoAuthRepository
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.authRepository.create(createUserDto); 
  }

  // async login(loginUserDto: LoginUserDto): Promise<User> {
  //   return await this.authRepository.login(loginUserDto); 
  // }
  
  async findUserById(email: string): Promise<User | null> {
    return await this.authRepository.findUserById(email); 
  }

}

export default AuthService;

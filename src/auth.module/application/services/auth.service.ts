
import { inject, injectable } from "inversify";
import { MongoAuthRepository } from "../../infraestructure/repositories/mongo-auth.repository";
import { User } from "../../domain/entities/user.entity";
import { CreateUserDto } from "../dtos/create.user.dto";

@injectable()
export class AuthService {
  constructor(
    @inject(MongoAuthRepository) private authRepository: MongoAuthRepository
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.authRepository.create(createUserDto); 
  }

  async existingUser(email: string): Promise<User | null> {
    return await this.authRepository.existingUser(email); 
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.authRepository.findUserById(id); 
  }

}

export default AuthService;

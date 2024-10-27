import { CreateUserDto } from "../../dtos/create-user.dto";
import { User } from "../../entities/user.model";

export interface IAuthRepository {
  create(user: CreateUserDto): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}

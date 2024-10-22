import { CreateUserDto, LoginUserDto } from "../../application/dtos";
import { User } from "../entities/user.entity";

export interface AuthRepository {
    create(user: CreateUserDto): Promise<User | null>;
    existingUser(email: string): Promise<User | null>;
    // login(user: LoginUserDto): Promise<User | null>;
    findUserById(email: string): Promise<User | null>;
  }
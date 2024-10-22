import { ObjectId, Db } from "mongodb"; // Importar Db
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { User } from "../../domain/entities/user.entity";
import { CreateUserDto, LoginUserDto } from "../../application/dtos";
import mapToUser from "../../application/mappers/user.mapper";

export class MongoAuthRepository implements AuthRepository {
  private collection;

  constructor(db: Db) {
     this.collection = db.collection("users");
  }
  
  async create(user: CreateUserDto): Promise<User> {
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.passwordHashed,
      createdAt: new Date(),
    };
    const result = await this.collection.insertOne(newUser);
    
    return {
      id: result.insertedId.toString(),
      name: newUser.name,
      email: newUser.email,
      password: newUser.password
    };
  }

  async existingUser(email: string): Promise<User | null> {
    const user = await this.collection.findOne({ email });
    return mapToUser(user);
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.collection.findOne({ _id: new ObjectId(id) });
    return mapToUser(user);
  }

}

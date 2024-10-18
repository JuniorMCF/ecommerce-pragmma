import { ObjectId, Db } from "mongodb"; // Importar Db
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { User } from "../../domain/entities/user.entity";
import { CreateUserDto, LoginUserDto } from "../../application/dtos";

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
      id: result.insertedId.toString(), // TODO: evaluar si debería devolver el id del user
      ...newUser,
    } as User;
  }

  // async login(user: LoginUserDto): Promise<User> {
  //   const user = {
  //     name: user.name,
  //     email: user.email,
  //     createdAt: new Date(),
  //   };
  //   const result = await this.collection.insertOne(user);
  
    
  //   return {
  //     id: result.insertedId.toString(),
  //     ...user,
  //   } as User;
  // }

  async findUserById(email: string): Promise<User | null> {
    const user = await this.collection.findOne({ email });
    return user as User | null;
  }

}

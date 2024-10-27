import { ObjectId, Db } from "mongodb"; // Importar Db
import { IAuthRepository } from "../contracts/repositories/iauth.repository";
import { User } from "../models/user.model";
import { CreateUserDto } from "../../../core/types/create-user.dto";
import { inject, injectable } from "inversify";
/* import { Server as SocketIoServer } from "socket.io"; */

@injectable()
export class AuthRepository implements IAuthRepository {
  private collection;

  constructor(
    @inject(Db) private db: Db,
/*     @inject(SocketIoServer) private io: SocketIoServer */
  ) {
    this.collection = this.db.collection("users");
  }

  async create(user: CreateUserDto): Promise<User | undefined> {
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.passwordHashed,
      createdAt: new Date(),
    };
    const result = await this.collection.insertOne(newUser);

    return new User({
      id: result.insertedId.toString(),
      name: newUser.name,
      email: newUser.email,
    });
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.collection.findOne({ _id: new ObjectId(id) });
    return user
      ? new User({
          id: user._id?.toString(),
          name: user.name,
          email: user.email,
        })
      : undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.collection.findOne({ email: email });
    return user
      ? new User({
          id: user._id?.toString(),
          name: user.name,
          email: user.email,
        })
      : undefined;
  }
}

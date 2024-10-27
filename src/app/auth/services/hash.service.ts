import { injectable } from "inversify";
import * as bcrypt from "bcrypt";
import { IHashService } from "../contracts/services/ihash.service";

@injectable()
export class BcryptHashService implements IHashService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
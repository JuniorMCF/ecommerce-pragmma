import { Container } from "inversify";
import { IAuthService } from "../../app/auth/contracts/services/iauth.service";
import { AuthService } from "../../app/auth/services/auth.service";
import { IAuthRepository } from "../../app/auth/contracts/repositories/iauth.repository";
import { AuthRepository } from "../../app/auth/repositories/auth.repository";
import { AuthController } from "../../app/auth/controllers/auth.controller";
import { IHashService } from "../../app/auth/contracts/services/ihash.service";
import { BcryptHashService } from "../../app/auth/services/hash.service";
import { ITokenService } from "../../app/auth/contracts/services/itoken.service";
import { TokenService } from "../../app/auth/services/token.service";
import { Database } from "../classes/mongo-database";
import { Server as SocketIoServer } from "socket.io";

const authContainer = (container: Container): Container => {
  // Binding de servicios
  container.bind<IAuthService>(AuthService).toSelf();
  container.bind<IHashService>(BcryptHashService).toSelf();
  container.bind<ITokenService>(TokenService).toDynamicValue(() => {
    const secretKey = process.env.JWT_ACCESS_SECRET || "";
    const expiresIn = process.env.JWT_EXPIRATION || "1h";
    return new TokenService(secretKey, expiresIn);
  });

/*   const ioInstance = container.get(SocketIoServer); */

  container
    .bind<IAuthRepository>(AuthRepository)
    .toConstantValue(new AuthRepository(Database.getInstance().getDb()));

  container.bind<AuthController>(AuthController).toSelf();

  return container;
};

export default authContainer;

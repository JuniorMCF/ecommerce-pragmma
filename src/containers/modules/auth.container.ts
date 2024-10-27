import { Container } from "inversify";
import { IAuthService } from "../../contracts/services/iauth.service";
import { AuthService } from "../../services/auth.service";
import { IAuthRepository } from "../../contracts/repositories/iauth.repository";
import { AuthRepository } from "../../repositories/auth.repository";
import { AuthController } from "../../controllers/api/auth.controller";
import { IHashService } from "../../contracts/services/ihash.service";
import { BcryptHashService } from "../../services/hash.service";
import { ITokenService } from "../../contracts/services/itoken.service";
import { TokenService } from "../../services/token.service";
import { Database } from "../../database/mongo-database";

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

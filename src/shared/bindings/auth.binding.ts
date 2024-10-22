import { Container } from "inversify";
import { RegisterUserCommand } from "../../auth.module/application/commands/register-user.command";
import { LoginCommand } from "../../auth.module/application/commands/login.command";
import { VerifyTokenCommand } from "../../auth.module/application/commands/verify-token.command";
import AuthService from "../../auth.module/application/services/auth.service";
import { MongoAuthRepository } from "../../auth.module/infraestructure/repositories/mongo-auth.repository";
import { Db } from "mongodb";
import { AuthController } from "../../auth.module/presentation/controllers/auth.controller";



const authBinding = (container:Container,db:Db):Container=>{
      // Auth dependencies
  container.bind<RegisterUserCommand>(RegisterUserCommand).toSelf();
  container.bind<LoginCommand>(LoginCommand).toSelf();
  container.bind<VerifyTokenCommand>(VerifyTokenCommand).toSelf();
  container.bind<AuthService>(AuthService).toSelf();
  container.bind<MongoAuthRepository>(MongoAuthRepository).toDynamicValue(() => new MongoAuthRepository(db));


  container.bind<AuthController>(AuthController).toSelf();

  return container
}

export default authBinding


import { Container } from 'inversify';
import { MongoOrderRepository } from '../../order.module/infraestructure/repositories/mongo-order.repository';
import { OrderService } from '../../order.module/application/services/order.service';
import { CreateOrderCommand } from '../../order.module/application/commands/create-order.command';
import { UpdateOrderCommand } from '../../order.module/application/commands/update-order.command';
import { GetOrderByIdQuery } from '../../order.module/application/queries/get-order-by-id.query';
import { DeleteOrderCommand } from '../../order.module/application/commands/delete-order-command';
import { connectToDatabase } from "../../auth.module/infraestructure/database/Database"; 
import { Db } from 'mongodb';
import { OrderController } from '../../order.module/presentation/controllers/order.controller';
import { AuthController } from '../../auth.module/presentation/controllers/auth.controller';
import { MongoAuthRepository } from '../../auth.module/infraestructure/repositories/mongo-auth.repository';
import { RegisterUserCommand } from '../../auth.module/application/commands/register-user.command';
import AuthService from '../../auth.module/application/services/auth.service';
import { LoginCommand } from '../../auth.module/application/commands/login.command';


const container = new Container();

// Función para inicializar las dependencias
export const initializeContainer = async (): Promise<Container> => {
  const db: Db = await connectToDatabase();

  // Registrar los bindings
  container.bind<CreateOrderCommand>(CreateOrderCommand).toSelf();
  container.bind<UpdateOrderCommand>(UpdateOrderCommand).toSelf();
  container.bind<GetOrderByIdQuery>(GetOrderByIdQuery).toSelf();
  container.bind<DeleteOrderCommand>(DeleteOrderCommand).toSelf();
  container.bind<OrderService>(OrderService).toSelf();
  
  container.bind<MongoOrderRepository>(MongoOrderRepository).toDynamicValue(() => new MongoOrderRepository(db));

  // Auth dependencies
  container.bind<RegisterUserCommand>(RegisterUserCommand).toSelf();
  container.bind<LoginCommand>(LoginCommand).toSelf();
  container.bind<AuthService>(AuthService).toSelf();
  container.bind<MongoAuthRepository>(MongoAuthRepository).toDynamicValue(() => new MongoAuthRepository(db));

  // Registrar el controlador para que pueda resolver sus dependencias
  container.bind<OrderController>(OrderController).toSelf();
  container.bind<AuthController>(AuthController).toSelf();
  return container;
};

import { Container } from "inversify";
import OrderService from "../../services/order.service";
import { OrderController } from "../../controllers/api/order.controller";
import { OrderRepository } from "../../repositories/order.repository";
import { IOrderService } from "../../contracts/services/iorder.service";
import { IOrderRepository } from "../../contracts/repositories/iorder.repository";
import { Database } from "../../database/mongo-database";
import { Server as SocketIOServer } from "socket.io";

const orderContainer = (container: Container): Container => {
  container.bind<IOrderService>(OrderService).toSelf();

  const ioInstance = container.get(SocketIOServer);


  container
    .bind<IOrderRepository>(OrderRepository)
    .toConstantValue(new OrderRepository(Database.getInstance().getDb(),ioInstance));

  container.bind<OrderController>(OrderController).toSelf();

  return container;
};

export default orderContainer;

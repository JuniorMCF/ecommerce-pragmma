import { Container } from "inversify";
import OrderService from "../../app/order/services/order.service";
import { OrderController } from "../../app/order/controllers/order.controller";
import { OrderRepository } from "../../app/order/repositories/order.repository";
import { IOrderService } from "../../app/order/contracts/services/iorder.service";
import { IOrderRepository } from "../../app/order/contracts/repositories/iorder.repository";
import { Database } from "../classes/mongo-database";
import { Server as SocketIoServer } from "socket.io";

const orderContainer = (container: Container): Container => {
  container.bind<IOrderService>(OrderService).toSelf();

  const ioInstance = container.get(SocketIoServer);


  container
    .bind<IOrderRepository>(OrderRepository)
    .toConstantValue(new OrderRepository(Database.getInstance().getDb(),ioInstance));

  container.bind<OrderController>(OrderController).toSelf();

  return container;
};

export default orderContainer;

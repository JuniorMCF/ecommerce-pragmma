import { Container } from "inversify";
import { CreateOrderCommand } from "../../order.module/application/commands/create-order.command";
import { UpdateOrderCommand } from "../../order.module/application/commands/update-order.command";
import { GetOrderByIdQuery } from "../../order.module/application/queries/get-order-by-id.query";
import { DeleteOrderCommand } from "../../order.module/application/commands/delete-order-command";
import OrderService from "../../order.module/application/services/order.service";
import { OrderController } from "../../order.module/presentation/controllers/order.controller";
import { MongoOrderRepository } from "../../order.module/infraestructure/repositories/mongo-order.repository";
import { Db } from "mongodb";

const orderBinding = (container:Container,db:Db):Container=>{
    container.bind<CreateOrderCommand>(CreateOrderCommand).toSelf();
    container.bind<UpdateOrderCommand>(UpdateOrderCommand).toSelf();
    container.bind<GetOrderByIdQuery>(GetOrderByIdQuery).toSelf();
    container.bind<DeleteOrderCommand>(DeleteOrderCommand).toSelf();
    container.bind<OrderService>(OrderService).toSelf();
    
    container.bind<MongoOrderRepository>(MongoOrderRepository).toDynamicValue(() => new MongoOrderRepository(db));
  
    // Registrar el controlador para que pueda resolver sus dependencias
    container.bind<OrderController>(OrderController).toSelf();

    return container
}

export default orderBinding
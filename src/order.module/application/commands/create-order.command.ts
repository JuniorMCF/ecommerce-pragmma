import { injectable } from "inversify";
import { CreateOrderDto } from "../dtos/create-order.dto";
import { OrderService } from "../services/order.service";
import { Product } from "../../domain/entities/product";
import { Order } from "../../domain/entities/order";

@injectable()
export class CreateOrderCommand {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  async execute(
    clientId: string,
    paymentMethod: string,
    deliveryMethod: string,
    products: Product[]
  ): Promise<Order> {
    const orderDTO = new CreateOrderDto(
      clientId,
      paymentMethod,
      deliveryMethod,
      products
    );

    return await this.orderService.createOrder(orderDTO);
  }
}

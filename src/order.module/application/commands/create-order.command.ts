import { inject, injectable } from "inversify";
import { CreateOrderDto } from "../dtos/create-order.dto";
import { OrderService } from "../services/order.service";
import { Product } from "../../domain/entities/product";
import { Order } from "../../domain/entities/order";

@injectable()
export class CreateOrderCommand {

  constructor(
    @inject(OrderService) private orderService:OrderService
  ) {}

  async execute(
    userId: string,
    paymentMethod: string,
    deliveryMethod: string,
    products: Product[]
  ): Promise<Order> {
    const orderDTO = new CreateOrderDto(
      userId,
      paymentMethod,
      deliveryMethod,
      products
    );

    return await this.orderService.createOrder(orderDTO);
  }
}

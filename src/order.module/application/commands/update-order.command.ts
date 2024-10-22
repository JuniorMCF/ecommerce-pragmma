import { injectable, inject } from "inversify";
import { OrderService } from "../services/order.service";
import { Product } from "../../domain/entities/product";
import { Order } from "../../domain/entities/order";
import { UpdateOrderDto } from "../dtos/update-order.dto";

@injectable()
export class UpdateOrderCommand {
  constructor(@inject(OrderService) private orderService: OrderService) {}

  async execute(
    orderId: string,
    userId: string,
    paymentMethod: string,
    deliveryMethod: string,
    status: string,
    products: Product[]
  ): Promise<Order | null> {
    const orderDTO = new UpdateOrderDto(
      userId,
      paymentMethod,
      deliveryMethod,
      status,
      products
    );

    return await this.orderService.updateOrder(orderId, orderDTO);
  }
}

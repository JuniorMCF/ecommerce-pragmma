import { inject, injectable } from "inversify";
import { OrderService } from "../services/order.service";

@injectable()
export class DeleteOrderCommand {
  constructor(@inject(OrderService) private orderService: OrderService) {}

  async execute(orderId: string): Promise<Boolean> {
    return await this.orderService.deleteOrder(orderId);
  }
}

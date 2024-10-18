import { injectable } from "inversify";
import { OrderService } from "../services/order.service";

@injectable()
export class DeleteOrderCommand {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  async execute(orderId: string): Promise<Boolean> {
    return await this.orderService.deleteOrder(orderId);
  }
}
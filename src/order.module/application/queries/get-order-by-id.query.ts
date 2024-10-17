import { injectable } from "inversify";
import { OrderService } from "../services/order.service";
import { Order } from "../../domain/entities/order";

@injectable()
export class GetOrderByIdQuery {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  async execute(orderId: string): Promise<Order | null> {
    // Llamar al servicio para obtener la orden por su ID
    const order = await this.orderService.getOrderById(orderId);
    
    // Si no se encuentra la orden, devolver null
    if (!order) {
      return null;
    }

    // Devolver la orden encontrada
    return order;
  }
}

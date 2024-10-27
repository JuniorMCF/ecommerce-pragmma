import { ServiceResult } from "../../responses/service-result.dto";
import { CreateOrderDTO } from "../../dtos/create-order.dto";
import { UpdateOrderDTO } from "../../dtos/update-order.dto";
import { Order } from "../../entities/order";

export interface IOrderService {
  createOrder(data: CreateOrderDTO): Promise<ServiceResult<Order>>;
  getOrderById(orderId: string): Promise<ServiceResult<Order>>;
  updateOrder(
    orderId: string,
    data: UpdateOrderDTO
  ): Promise<ServiceResult<Order>>;
  deleteOrder(orderId: string): Promise<ServiceResult<Order>>;
}

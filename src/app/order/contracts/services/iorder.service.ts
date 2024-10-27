import { ServiceResult } from "../../../../core/responses/service-result.dto";
import { CreateOrderDTO } from "../../../../core/types/create-order.dto";
import { UpdateOrderDTO } from "../../../../core/types/update-order.dto";
import { Order } from "../../models/order";

export interface IOrderService {
  createOrder(data: CreateOrderDTO): Promise<ServiceResult<Order>>;
  getOrderById(orderId: string): Promise<ServiceResult<Order>>;
  updateOrder(
    orderId: string,
    data: UpdateOrderDTO
  ): Promise<ServiceResult<Order>>;
  deleteOrder(orderId: string): Promise<ServiceResult<Order>>;
}

import { inject, injectable } from "inversify";
import { CreateOrderDTO } from "../dtos/create-order.dto";
import { Order } from "../entities/order";
import { OrderDetail } from "../entities/order-detail";
import { OrderRepository } from "../repositories/order.repository";
import { UpdateOrderDTO } from "../dtos/update-order.dto";
import { IOrderRepository } from "../contracts/repositories/iorder.repository";
import { ProductOrder } from "../entities/product-order";
import { IOrderService } from "../contracts/services/iorder.service";
import { ServiceResult } from "../responses/service-result.dto";

@injectable()
export class OrderService implements IOrderService {
  constructor(
    @inject(OrderRepository) private orderRepository: IOrderRepository
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDTO
  ): Promise<ServiceResult<Order>> {
    const orderDetails = createOrderDto.products.map((product) => {
      return new OrderDetail({
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
      });
    });

    const order = new Order({
      userId: createOrderDto.userId,
      total: createOrderDto.total,
      paymentMethod: createOrderDto.paymentMethod,
      deliveryMethod: createOrderDto.deliveryMethod,
      orderDetails: orderDetails,
    });

    const createdOrder = await this.orderRepository.create(order);

    if (!createdOrder) {
      return ServiceResult.failure<Order>(
        "Failed to create order",
        "ORDER_CREATION_FAILED",
        400
      );
    }

    return ServiceResult.success<Order>(
      createdOrder,
      "Order created successfully",
      201
    );
  }

  async updateOrder(
    orderId: string,
    updateData: UpdateOrderDTO
  ): Promise<ServiceResult<Order>> {
    const existingOrder = await this.orderRepository.findById(orderId);
    if (!existingOrder) {
      return ServiceResult.notFound<Order>("Order not found");
    }

    const orderDetails = updateData.products.map((product: ProductOrder) => {
      return new OrderDetail({
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
      });
    });

    const updateOrder = new Order({
      id: orderId,
      userId: updateData.userId,
      total: updateData.total,
      paymentMethod: updateData.paymentMethod,
      deliveryMethod: updateData.deliveryMethod,
      status: updateData.status,
      orderDetails: orderDetails,
    });

    const updatedOrder = await this.orderRepository.update(updateOrder);
    if (!updatedOrder) {
      return ServiceResult.failure<Order>(
        "Failed to update order",
        "ORDER_UPDATE_FAILED",
        400
      );
    }

    return ServiceResult.success<Order>(
      updatedOrder,
      "Order updated successfully",
      200
    );
  }

  async getOrderById(orderId: string): Promise<ServiceResult<Order>> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      return ServiceResult.notFound<Order>("Order not found");
    }
    return ServiceResult.success<Order>(order, "Order found", 200);
  }

  async deleteOrder(orderId: string): Promise<ServiceResult<Order>> {
    const result = await this.orderRepository.delete(orderId);
    if (!result) {
      return ServiceResult.notFound<Order>("Order not found.");
    }
    return ServiceResult.success<Order>(
      undefined as unknown as Order,
      "Order deleted",
      204
    );
  }
}

export default OrderService;

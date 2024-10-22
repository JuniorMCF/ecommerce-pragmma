import { inject, injectable } from "inversify";
import { CreateOrderDto } from "../dtos/create-order.dto";
import { Order, OrderBuilder } from "../../domain/entities/order";
import { OrderDetailBuilder } from "../../domain/entities/order-detail";
import { MongoOrderRepository } from "../../infraestructure/repositories/mongo-order.repository";
import { UpdateOrderDto } from "../dtos/update-order.dto";
import { IOrderRepository } from "../../domain/repositories/iorder.repository";

@injectable()
export class OrderService {
  constructor(
    @inject(MongoOrderRepository) private orderRepository: IOrderRepository
  ) {}
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderDetails = createOrderDto.products.map((product) => {
      return new OrderDetailBuilder()
        .setProductId(product.id)
        .setQuantity(product.quantity)
        .setPrice(product.price)
        .build();
    });

    const order = new OrderBuilder()
      .setUserId(createOrderDto.userId)
      .setTotal(createOrderDto.total)
      .setPaymentMethod(createOrderDto.paymentMethod)
      .setDeliveryMethod(createOrderDto.deliveryMethod)
      .setOrderDetails(orderDetails)
      .build();

    return await this.orderRepository.create(order); 
  }

  async updateOrder(
    orderId: string,
    updateData: UpdateOrderDto
  ): Promise<Order | null> {
    const existingOrder = await this.orderRepository.findById(orderId);
    if (!existingOrder) {
      return null
    }

    const orderDetails = updateData.products.map((product) => {
      return new OrderDetailBuilder()
        .setProductId(product.id)
        .setQuantity(product.quantity)
        .setPrice(product.price)
        .build();
    });

    const updateOrder = new OrderBuilder()
      .setUserId(updateData.userId)
      .setTotal(updateData.total)
      .setPaymentMethod(updateData.paymentMethod)
      .setDeliveryMethod(updateData.deliveryMethod)
      .setStatus(updateData.status)
      .setOrderDetails(orderDetails)
      .build();

    return await this.orderRepository.update(updateOrder);
  }
  async getOrderById(orderId: string): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findById(orderId);
      if (!order) {
        return null;
      }
      return order;
    } catch (error) {
      console.error(`Error al buscar la orden con ID: ${orderId}`, error);
      throw new Error("Error al obtener la orden");
    }
  }

  async deleteOrder(orderId: string): Promise<Boolean> {
    return await this.orderRepository.delete(orderId);

  }
}

export default OrderService;

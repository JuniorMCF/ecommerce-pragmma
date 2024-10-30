import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import OrderService from "../../services/order.service";
import { IOrderService } from "../../contracts/services/iorder.service";
import { CreateOrderDTO } from "../../dtos/create-order.dto";
import { UpdateOrderDTO } from "../../dtos/update-order.dto";
import { BaseController } from "../base.controller";
import { Order } from "../../entities/order";
import { ServiceResult } from "../../responses/service-result.dto";
import { CartService } from "../../services/cart.service";
import { ICartService } from "../../contracts/services/icart.service";
import { Cart } from "../../entities/cart";
import { ProductOrder } from "../../entities/product-order";

@injectable()
export class OrderController extends BaseController {
  constructor(
    @inject(OrderService) private orderService: IOrderService,
    @inject(CartService) private cartService: ICartService
  ) {
    super();
  }

  // Crear una nueva orden
  public async createOrder(req: Request, res: Response): Promise<void> {
    const { id } = req.body.user;// Obtener el userId desde el middleware de autenticación
    const { paymentMethod, deliveryMethod } = req.body;

    // Obtener el carrito del usuario
    const cartResult: ServiceResult<Cart> = await this.cartService.getCart(id);

    if (!cartResult.isSuccess || !cartResult.data || cartResult.data.cartDetails.length === 0) {
      return this.errorResponse(res, "Cart is empty or could not be retrieved", 400);
    }

    // Crear el DTO de la orden con los datos del carrito
    const orderDTO = new CreateOrderDTO(
      id,
      paymentMethod,
      deliveryMethod,
      cartResult.data.cartDetails as ProductOrder[]
    );

    // Crear la orden en el servicio
    const response: ServiceResult<Order> = await this.orderService.createOrder(orderDTO);

    if (!response.isSuccess) {
      return this.errorResponse(res, response.message, response.status);
    }

    // Limpiar el carrito después de crear la orden
    await this.cartService.clearCart(id);

    return this.successResponse(res, response.data, response.message, response.status);
  }

  // Obtener una orden por ID
  public async getOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;

    const response: ServiceResult<Order> = await this.orderService.getOrderById(orderId);
    if (!response.isSuccess) {
      return this.errorResponse(res, response.message, response.status);
    }

    return this.successResponse(res, response.data, response.message, response.status);
  }

  // Actualizar una orden
  public async updateOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const { userId, paymentMethod, deliveryMethod, status, products } = req.body;

    const orderDTO = new UpdateOrderDTO(userId, paymentMethod, deliveryMethod, status, products);

    const response: ServiceResult<Order> = await this.orderService.updateOrder(orderId, orderDTO);

    if (!response.isSuccess) {
      return this.errorResponse(res, response.message, response.status);
    }

    return this.successResponse(res, response.data, response.message, response.status);
  }

  // Eliminar una orden
  public async deleteOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;

    const response: ServiceResult<Order> = await this.orderService.deleteOrder(orderId);

    if (!response.isSuccess) {
      return this.errorResponse(res, response.message, response.status);
    }

    return this.successResponse(res, response.data, response.message, response.status);
  }
}

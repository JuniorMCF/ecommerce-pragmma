import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import OrderService from "../services/order.service";
import { IOrderService } from "../contracts/services/iorder.service";
import { CreateOrderDTO } from "../../../core/types/create-order.dto";
import { UpdateOrderDTO } from "../../../core/types/update-order.dto";
import { BaseController } from "../../../core/classes/base.controller";
import { Order } from "../models/order";
import { ServiceResult } from "../../../core/responses/service-result.dto";

@injectable()
export class OrderController extends BaseController {
  constructor(@inject(OrderService) private orderService: IOrderService) {
    super();
  }

  // Crear una nueva orden
  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { userId, paymentMethod, deliveryMethod, products } = req.body;

      const orderDTO = new CreateOrderDTO(
        userId,
        paymentMethod,
        deliveryMethod,
        products
      );

      const response: ServiceResult<Order> =
        await this.orderService.createOrder(orderDTO);

      if (!response.isSuccess) {
        return this.errorResponse(res, response.message, response.status);
      }

      return this.successResponse(
        res,
        response.data,
        response.message,
        response.status
      );
    } catch (error:any) {
      throw new Error(error);
    }
  }

  // Obtener una orden por ID
  public async getOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;

    try {
      const response: ServiceResult<Order> =
        await this.orderService.getOrderById(orderId);
      if (!response.isSuccess) {
        return this.errorResponse(res, response.message, response.status);
      }

      return this.successResponse(
        res,
        response.data,
        response.message,
        response.status
      );
    } catch (error:any) {
      throw new Error(error);
    }
  }

  // Actualizar una orden
  public async updateOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const { userId, paymentMethod, deliveryMethod, status, products } =
      req.body;

    try {
      const orderDTO = new UpdateOrderDTO(
        userId,
        paymentMethod,
        deliveryMethod,
        status,
        products
      );

      const response: ServiceResult<Order> =
        await this.orderService.updateOrder(orderId, orderDTO);

      if (!response.isSuccess) {
        return this.errorResponse(res, response.message, response.status);
      }

      return this.successResponse(
        res,
        response.data,
        response.message,
        response.status
      );
    } catch (error:any) {
      throw new Error(error);
    }
  }

  // Eliminar una orden
  public async deleteOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;

    try {
      const response: ServiceResult<Order> = await this.orderService.deleteOrder(orderId);

      if (!response.isSuccess) {
        return this.errorResponse(res, response.message, response.status);
      }

      return this.successResponse(
        res,
        response.data,
        response.message,
        response.status
      );
    } catch (error:any) {
      throw new Error(error);
    }
  }
}

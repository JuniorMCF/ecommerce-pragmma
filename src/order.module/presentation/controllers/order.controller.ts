import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CreateOrderCommand } from "../../application/commands/create-order.command";
import { UpdateOrderCommand } from "../../application/commands/update-order.command";
import { GetOrderByIdQuery } from "../../application/queries/get-order-by-id.query";
import { DeleteOrderCommand } from "../../application/commands/delete-order-command";
import { OrderValidator } from "../../application/validations/order.validation";
import { errorResponse, successResponse } from "../../../shared/response.handler";

@injectable()
export class OrderController {
  constructor(
    @inject(CreateOrderCommand) private createOrderCommand: CreateOrderCommand,
    @inject(UpdateOrderCommand) private updateOrderCommand: UpdateOrderCommand,
    @inject(GetOrderByIdQuery) private getOrderByIdQuery: GetOrderByIdQuery,
    @inject(DeleteOrderCommand) private deleteOrderCommand: DeleteOrderCommand
  ) {}

  // Crear una nueva orden
  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const validationError = OrderValidator.validateCreateOrder(req.body);
      if (validationError) {
        return errorResponse(res, validationError, 400);
      }
  
      const { userId, paymentMethod, deliveryMethod, products } = req.body;
  
     
      const data = await this.createOrderCommand!.execute(
        userId,
        paymentMethod,
        deliveryMethod,
        products
      );
  
      successResponse(res, data, "Order created", 201);
    } catch (error: any) {
      // Aquí capturamos el error y lo enviamos al middleware global de manejo de errores
      console.error("Error creating order:", error);
      errorResponse(res, "Internal Server Error", 500);
    }
  }

  // Obtener una orden por ID
  public async getOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;

    if (!orderId || typeof orderId !== "string") {
      return errorResponse(res, "Order ID is required and must be a valid string.", 400);
    }

    try {
      const order = await this.getOrderByIdQuery.execute(orderId);
      if (!order) {
        return errorResponse(res, "Order not found", 404);
      }
      successResponse(res, order, "Order fetched", 200);
    } catch (error: any) {
      console.error("Error fetching order:", error);
      errorResponse(res, error.message || "Error interno del servidor", 500);
    }
  }

  // Actualizar una orden
  public async updateOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params; 
    const { userId, paymentMethod, deliveryMethod,status, products } = req.body; 
  
    const validationError = OrderValidator.validateUpdateOrder(req.body, orderId);
    if (validationError) {
      return errorResponse(res, validationError, 400);
    }
  
    try {
      const order = await this.updateOrderCommand.execute(
        orderId, 
        userId,
        paymentMethod,
        deliveryMethod,
        status,
        products
      );
    
      if (!order) {
        return errorResponse(res, "Order not found", 404);
      }
      successResponse(res, order, "Order updated", 201);
    } catch (error: any) {
      console.error("Error updating order:", error);
      errorResponse(res, error.message || "Error interno del servidor", 500);
    }
  }

  // Eliminar una orden
  public async deleteOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;

    if (!orderId || typeof orderId !== "string") {
      return errorResponse(res, "Order ID is required and must be a string.", 400);
    }

    try {
      const result = await this.deleteOrderCommand.execute(orderId);

      if (!result) {
        return errorResponse(res, "Order not found", 404);
      }
      successResponse(res, null, "Order deleted", 200);
    } catch (error: any) {
      console.error("Error deleting order:", error);
      errorResponse(res, error.message || "Error interno del servidor", 500);
    }
  }
}

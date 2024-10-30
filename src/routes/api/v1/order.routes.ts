import { Router } from "express";
import { Container } from "inversify";
import { OrderController } from "../../../controllers/api/order.controller";
import { OrderValidator } from "../../../validations/order.validator";
import { catchAsync } from "../../../utils/catch-async";


const orderRoutes = (container: Container) => {
  const router = Router();

  const orderController = 
   container.get<OrderController>(OrderController);

  // Rutas con validaciones
  router.post(
    "/orders",
    OrderValidator.validateCreateOrder,
    catchAsync( orderController.createOrder.bind(orderController))
  );

  router.get(
    "/orders/:orderId",
    OrderValidator.validateOrderId,
    catchAsync(  orderController.getOrder.bind(orderController))
  );

  router.put(
    "/orders/:orderId",
    OrderValidator.validateUpdateOrder,
    catchAsync( orderController.updateOrder.bind(orderController))
  );

  router.delete(
    "/orders/:orderId",
    OrderValidator.validateOrderId,

    catchAsync( orderController.deleteOrder.bind(orderController))
  );

  return router;
};

export default orderRoutes;

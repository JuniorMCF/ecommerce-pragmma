import { Router } from "express";
import { Container } from "inversify";
import { OrderController } from "../controllers/order.controller";
import { OrderValidator } from "../validations/order.validator";

const orderRoutes = (container: Container) => {
  const router = Router();

  const orderController = container.get<OrderController>(OrderController);

  // Rutas con validaciones
  router.post(
    "/orders",
    OrderValidator.validateCreateOrder,
    orderController.createOrder.bind(orderController)
  );

  router.get(
    "/orders/:orderId",
    OrderValidator.validateOrderId,
    orderController.getOrder.bind(orderController)
  );

  router.put(
    "/orders/:orderId",
    OrderValidator.validateUpdateOrder,
    orderController.updateOrder.bind(orderController)
  );

  router.delete(
    "/orders/:orderId",
    OrderValidator.validateOrderId,

    orderController.deleteOrder.bind(orderController)
  );

  return router;
};

export default orderRoutes;

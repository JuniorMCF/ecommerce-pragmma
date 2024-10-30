import { Router } from "express";
import { Container } from "inversify";
import { OrderController } from "../../../controllers/api/order.controller";
import { OrderValidator } from "../../../validations/order.validator";
import { catchAsync } from "../../../utils/catch-async";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";


const orderRoutes = (container: Container) => {
  const router = Router();

  const orderController = 
   container.get<OrderController>(OrderController);

  // Rutas con validaciones
  router.post(
    "/orders",
    AuthMiddleware.validateAndVerifyToken,
    OrderValidator.validateCreateOrder,
    catchAsync( orderController.createOrder.bind(orderController))
  );

  router.get(
    "/orders/:orderId",
    AuthMiddleware.validateAndVerifyToken,
    OrderValidator.validateOrderId,
    catchAsync(  orderController.getOrder.bind(orderController))
  );

  router.put(
    "/orders/:orderId",
    AuthMiddleware.validateAndVerifyToken,
    OrderValidator.validateUpdateOrder,
    catchAsync( orderController.updateOrder.bind(orderController))
  );

  router.delete(
    "/orders/:orderId",
    AuthMiddleware.validateAndVerifyToken,
    OrderValidator.validateOrderId,

    catchAsync( orderController.deleteOrder.bind(orderController))
  );

  return router;
};

export default orderRoutes;

import { Router } from 'express';
import { Container } from 'inversify';
import { OrderController } from '../controllers/order.controller';

const orderRoutes = (container: Container) => {
  const router = Router();
  
  // Resolver el controlador desde el contenedor
  const orderController = container.get<OrderController>(OrderController);

  router.post('/create', orderController.createOrder.bind(orderController));
  router.get('/:orderId', orderController.getOrder.bind(orderController));
  router.put('/:orderId/update', orderController.updateOrder.bind(orderController));
  router.delete('/:orderId', orderController.deleteOrder.bind(orderController));

  return router;
};

export default orderRoutes;

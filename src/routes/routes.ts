import { Router } from "express";
import { Container } from "inversify";
import orderRoutes from "./api/order.routes";
import authRoutes from "./api/auth.routes";
import categoryRoutes from "./api/category.routes";
import productRoutes from "./api/product.routes";

const apiRoutes = (container: Container): Router => {
  const router = Router();

  router.use(orderRoutes(container));
  router.use(categoryRoutes(container));
  router.use(authRoutes(container));
  router.use(productRoutes(container));
  return router;
};

export default apiRoutes;

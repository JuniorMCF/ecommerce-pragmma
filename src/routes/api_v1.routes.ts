import { Router } from "express";
import { Container } from "inversify";
import orderRoutes from "./api/v1/order.routes";
import authRoutes from "./api/v1/auth.routes";
import categoryRoutes from "./api/v1/category.routes";
import productRoutes from "./api/v1/product.routes";

const apiRoutesV1 = (container: Container): Router => {
  const router = Router();

  router.use(orderRoutes(container));
  router.use(categoryRoutes(container));
  router.use(authRoutes(container));
  router.use(productRoutes(container));
  return router;
};

export default apiRoutesV1;
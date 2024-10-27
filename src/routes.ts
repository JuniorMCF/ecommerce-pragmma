import { Router } from "express";
import { Container } from "inversify";
import orderRoutes from "./app/order/routes/order.routes";
import authRoutes from "./app/auth/routes/auth.router";
import categoryRoutes from "./app/categories/routes/category.routes";
import productRoutes from "./app/products/routes/product.routes";

const apiRoutes = (container: Container): Router => {
  const router = Router();

  router.use(orderRoutes(container));
  router.use(categoryRoutes(container));
  router.use(authRoutes(container));
  router.use(productRoutes(container));
  return router;
};

export default apiRoutes;

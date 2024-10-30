import { Router } from "express";
import { Container } from "inversify";
import { CartController } from "../../../controllers/api/cart.controller";
import { catchAsync } from "../../../utils/catch-async";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
import { CartValidator } from "../../../validations/cart.validator";

const cartRoutes = (container: Container) => {
  const router = Router();
  const cartController = container.get<CartController>(CartController);

  router.post(
    "/cart/add",
    AuthMiddleware.validateAndVerifyToken,
    CartValidator.validateAddToCart,
    catchAsync(cartController.addToCart.bind(cartController))
  );
  router.post(
    "/cart/remove",
    AuthMiddleware.validateAndVerifyToken,
    CartValidator.validateRemoveFromCart,
    catchAsync(cartController.removeFromCart.bind(cartController))
  );
  router.get(
    "/cart",
    AuthMiddleware.validateAndVerifyToken,
    catchAsync(cartController.getCart.bind(cartController))
  );

  return router;
};

export default cartRoutes;

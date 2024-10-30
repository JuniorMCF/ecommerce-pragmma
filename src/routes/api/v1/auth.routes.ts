import { Router } from "express";
import { Container } from "inversify";
import { AuthController } from "../../../controllers/api/auth.controller";
import { RegisterValidator } from "../../../validations/register.validator";
import { LoginValidator } from "../../../validations/login.validator";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
import { catchAsync } from "../../../utils/catch-async";

const authRoutes = (container: Container) => {
  const router = Router();
  const authController = container.get<AuthController>(AuthController);

  router.post(
    "/auth/register",
    RegisterValidator.validateRegister,
    catchAsync(authController.registerUser.bind(authController))
  );
  router.post(
    "/auth/login",
    LoginValidator.validateLogin,
    catchAsync(authController.login.bind(authController))
  );
  router.get(
    "/auth/verify",
    AuthMiddleware.validateAndVerifyToken,
    catchAsync(authController.verifyToken.bind(authController))
  );

  router.post(
    "/auth/logout",
    AuthMiddleware.validateAndVerifyToken,
    catchAsync(authController.logout.bind(authController))
  );
  // router.post('/profile', authController.registerUser.bind(authController));
  return router;
};

export default authRoutes;

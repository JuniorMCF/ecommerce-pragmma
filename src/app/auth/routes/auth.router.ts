import { Router } from "express";
import { Container } from "inversify";
import { AuthController } from "../controllers/auth.controller";
import { RegisterValidator } from "../validations/register.validator";
import { LoginValidator } from "../validations/login.validator";
import { AuthMiddleware } from "../../../core/middlewares/auth.middleware";

const authRoutes = (container: Container) => {
  const router = Router();
  const authController = container.get<AuthController>(AuthController);

  router.post(
    "/auth/register",
    RegisterValidator.validateRegister,
    authController.registerUser.bind(authController)
  );
  router.post(
    "/auth/login",
    LoginValidator.validateLogin,
    authController.login.bind(authController)
  );
  router.get(
    "/auth/verify",
    AuthMiddleware.validateAndVerifyToken,
    authController.verifyToken.bind(authController)
  );

  router.post(
    "/auth/logout",
    AuthMiddleware.validateAndVerifyToken,
    authController.logout.bind(authController)
  );
  // router.post('/profile', authController.registerUser.bind(authController));
  return router;
};

export default authRoutes;

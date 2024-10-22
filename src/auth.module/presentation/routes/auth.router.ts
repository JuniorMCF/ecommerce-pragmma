import { Router } from 'express';
import { Container } from 'inversify';
import { AuthController } from '../controllers/auth.controller';

const authRoutes = (container: Container) => {
  const router = Router();
  const authController = container.get<AuthController>(AuthController);

  router.post('/register', authController.registerUser.bind(authController));
  router.post('/login', authController.login.bind(authController));
  router.get('/verify', authController.verifyToken.bind(authController));
  // router.post('/logout', authController.registerUser.bind(authController));
  // router.post('/profile', authController.registerUser.bind(authController));
  return router;
};

export default authRoutes;

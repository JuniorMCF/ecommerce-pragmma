import { Router } from "express";
import { Container } from "inversify";
import { CategoryController } from "../../../controllers/api/category.controller";
import { CategoryValidator } from "../../../validations/category.validator";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";

const categoryRoutes = (container: Container) => {
  const router = Router();

  const categoryController =
    container.get<CategoryController>(CategoryController);

  router.post(
    "/categories",
    AuthMiddleware.validateAndVerifyToken,
    CategoryValidator.validateCreateCategory,

    categoryController.createCategory.bind(categoryController)
  );

  router.put(
    "/categories/:categoryId",
    AuthMiddleware.validateAndVerifyToken,
    CategoryValidator.validateUpdateCategory,

    categoryController.updateCategory.bind(categoryController)
  );

  router.get(
    "/categories/:categoryId",
    AuthMiddleware.validateAndVerifyToken,
    CategoryValidator.validateCategoryId,

    categoryController.getCategory.bind(categoryController)
  );

  router.delete(
    "/categories/:categoryId",
    AuthMiddleware.validateAndVerifyToken,
    CategoryValidator.validateCategoryId,

    categoryController.deleteCategory.bind(categoryController)
  );

  return router;
};

export default categoryRoutes;

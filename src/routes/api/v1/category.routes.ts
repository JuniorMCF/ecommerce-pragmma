import { Router } from "express";
import { Container } from "inversify";
import { CategoryController } from "../../../controllers/api/category.controller";
import { CategoryValidator } from "../../../validations/category.validator";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
import { catchAsync } from "../../../utils/catch-async";

const categoryRoutes = (container: Container) => {
  const router = Router();

  const categoryController =
    container.get<CategoryController>(CategoryController);


  router.get(
    "/categories/all",
    catchAsync(categoryController.allCategories.bind(categoryController))
  );

  router.get(
    "/categories/:categoryId/products",
    CategoryValidator.validateCategoryId,
    catchAsync(categoryController.productsByCategory.bind(categoryController))
  );
  router.post(
    "/categories",
    AuthMiddleware.validateAndVerifyToken,
    CategoryValidator.validateCreateCategory,

    catchAsync(categoryController.createCategory.bind(categoryController))
  );

  router.put(
    "/categories/:categoryId",
    AuthMiddleware.validateAndVerifyToken,
    CategoryValidator.validateUpdateCategory,

    catchAsync(categoryController.updateCategory.bind(categoryController))
  );

  router.get(
    "/categories/:categoryId",
    AuthMiddleware.validateAndVerifyToken,
    CategoryValidator.validateCategoryId,

    catchAsync(categoryController.getCategory.bind(categoryController))
  );

  router.delete(
    "/categories/:categoryId",
    AuthMiddleware.validateAndVerifyToken,
    CategoryValidator.validateCategoryId,

    catchAsync(categoryController.deleteCategory.bind(categoryController))
  );

  return router;
};

export default categoryRoutes;

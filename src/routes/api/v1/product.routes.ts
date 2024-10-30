import { Router } from "express";
import { Container } from "inversify";
import ProductController from "../../../controllers/api/product.controller";
import { ProductValidator } from "../../../validations/product.validator";
import { catchAsync } from "../../../utils/catch-async";
import multer from "multer";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";

const productRoutes = (container: Container) => {
  const router = Router();

  const productController = container.get<ProductController>(ProductController);

  const upload = multer();

  router.get(
    "/products/all",
    catchAsync(productController.allProduct.bind(productController))
  );
  // Rutas con validaciones
  router.post(
    "/products",
    AuthMiddleware.validateAndVerifyToken,
    upload.single("file"), // middleware para procesar el archivo y guardarlo en req file
    ProductValidator.validateCreateProduct,
    catchAsync(productController.createProduct.bind(productController))
  );

  router.get(
    "/products/:productId",
    ProductValidator.validateProductId,
    catchAsync(productController.getProduct.bind(productController))
  );

  router.put(
    "/products/:productId",
    AuthMiddleware.validateAndVerifyToken,
    upload.single("file"), // middleware para procesar el archivo y guardarlo en req file
    ProductValidator.validateUpdateProduct,
    productController.updateProduct.bind(productController)
  );

  router.delete(
    "/products/:productId",
    AuthMiddleware.validateAndVerifyToken,
    ProductValidator.validateProductId,

    catchAsync(productController.deleteProduct.bind(productController))
  );

  return router;
};

export default productRoutes;

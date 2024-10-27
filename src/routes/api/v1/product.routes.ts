import { Router } from "express";
import { Container } from "inversify";
import ProductController from "../../../controllers/api/product.controller";
import { ProductValidator } from "../../../validations/product.validator";


const productRoutes = (container: Container) => {
  const router = Router();

  const productController = container.get<ProductController>(ProductController);

  // Rutas con validaciones
  router.post(
    "/products",
    ProductValidator.validateCreateProduct,
    productController.createProduct.bind(productController)
  );

  router.get(
    "/products/:productId",
    ProductValidator.validateProductId,
    productController.getProduct.bind(productController)
  );

  router.put(
    "/products/:productId",
    ProductValidator.validateUpdateProduct,
    productController.updateProduct.bind(productController)
  );

  router.delete(
    "/products/:productId",
    ProductValidator.validateProductId,

    productController.deleteProduct.bind(productController)
  );

  router.get(
    "/products/all",
    productController.allProduct.bind(productController)
  );

  return router;
};

export default productRoutes;

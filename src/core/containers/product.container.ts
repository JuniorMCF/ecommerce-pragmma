import { Container } from "inversify";
import ProductController from "../../app/products/controllers/product.controller";
import { ProductRepository } from "../../app/products/repositories/product.repository";
import { IProductRepository } from "../../app/products/contracts/repositories/iproduct.repository";
import { IProductService } from "../../app/products/contracts/services/iproduct.service";
import ProductService from "../../app/products/services/product.service";
import { Database } from "../classes/mongo-database";

const productContainer = (container: Container): Container => {
  container.bind<IProductService>(ProductService).toSelf();
  container
    .bind<IProductRepository>(ProductRepository)
    .toConstantValue(new ProductRepository(Database.getInstance().getDb()));

  // Registrar el controlador para que pueda resolver sus dependencias
  container.bind<ProductController>(ProductController).toSelf();

  return container;
};

export default productContainer;

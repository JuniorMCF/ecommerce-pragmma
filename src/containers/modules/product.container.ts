import { Container } from "inversify";
import ProductController from "../../controllers/api/product.controller";
import { ProductRepository } from "../../repositories/product.repository";
import { IProductRepository } from "../../contracts/repositories/iproduct.repository";
import { IProductService } from "../../contracts/services/iproduct.service";
import ProductService from "../../services/product.service";
import { Database } from "../../database/mongo-database";

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

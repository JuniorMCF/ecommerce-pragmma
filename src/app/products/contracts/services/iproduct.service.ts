import { ServiceResult } from "../../../../core/responses/service-result.dto";
import { CreateProductDTO } from "../../../../core/types/create-product.dto";
import { UpdateProductDTO } from "../../../../core/types/update-product.dto";
import { Product } from "../../models/product";

export interface IProductService {
  createProduct(data: CreateProductDTO): Promise<ServiceResult<Product>>;
  updateProduct(data: UpdateProductDTO): Promise<ServiceResult<Product>>;
  findProductById(productId: string): Promise<ServiceResult<Product>>;
  deleteProduct(productId: string): Promise<ServiceResult<Product>>;
  allProducts(): Promise<ServiceResult<Product[]>>;
}

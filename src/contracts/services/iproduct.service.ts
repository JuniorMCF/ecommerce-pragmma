import { ServiceResult } from "../../responses/service-result.dto";
import { CreateProductDTO } from "../../dtos/create-product.dto";
import { UpdateProductDTO } from "../../dtos/update-product.dto";
import { Product } from "../../entities/product";

export interface IProductService {
  createProduct(data: CreateProductDTO): Promise<ServiceResult<Product>>;
  updateProduct(data: UpdateProductDTO): Promise<ServiceResult<Product>>;
  findById(productId: string): Promise<ServiceResult<Product>>;
  deleteProduct(productId: string): Promise<ServiceResult<Product>>;
  allProducts(): Promise<ServiceResult<Product[]>>;

  findByCategoryId(categoryId:string):Promise<ServiceResult<Product[]>>
}

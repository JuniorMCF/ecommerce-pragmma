import { Product } from "../../entities/product";

export interface IProductRepository {
  findByName(productName:string):Promise<Product | undefined>;
  findById(productId: string): Promise<Product | undefined>;
  create(product: Product): Promise<Product | undefined>;
  update(product: Product): Promise<Product | undefined>;
  delete(productId: string): Promise<Boolean>;
  findAll(): Promise<Product[]>;
  findByCategoryId(categoryId:string): Promise<Product[]>
}

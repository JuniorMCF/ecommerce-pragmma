import { Product } from "../../models/product";

export interface IProductRepository {
  findById(productId: string): Promise<Product | undefined>;
  create(product: Product): Promise<Product | undefined>;
  update(product: Product): Promise<Product | undefined>;
  delete(productId: string): Promise<Boolean>;
  findAll(): Promise<Product[]>;
}

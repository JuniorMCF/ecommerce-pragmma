import { inject, injectable } from "inversify";
import { IProductService } from "../contracts/services/iproduct.service";
import { CreateProductDTO } from "../dtos/create-product.dto";
import { UpdateProductDTO } from "../dtos/update-product.dto";
import { Product } from "../entities/product";
import { ServiceResult } from "../responses/service-result.dto";
import { IProductRepository } from "../contracts/repositories/iproduct.repository";
import { ProductRepository } from "../repositories/product.repository";

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(ProductRepository) private productRepository: IProductRepository // Inyecta el repositorio
  ) {}

  async createProduct(data: CreateProductDTO): Promise<ServiceResult<Product>> {
    try {
      const product = new Product({
        productName: data.productName,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
      });

      const createdProduct = await this.productRepository.create(product);

      if (!createdProduct) {
        return ServiceResult.failure<Product>(
          "Failed to create order",
          "PRODUCT_CREATED_FAILED",
          400
        );
      }

      return ServiceResult.success<Product>(
        createdProduct,
        "Product created successfully.",
        201
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateProduct(data: UpdateProductDTO): Promise<ServiceResult<Product>> {
    try {
      const existingProduct = await this.productRepository.findById(data.id);
      if (!existingProduct) {
        return ServiceResult.notFound<Product>("Product not found.");
      }

      const updatedProductData: Partial<Product> = {
        id: existingProduct.id,
        productName: data.productName ?? existingProduct.productName,
        description: data.description ?? existingProduct.description,
        price: data.price ?? existingProduct.price,
        stock: data.stock !== undefined ? data.stock : existingProduct.stock,
        categoryId: data.categoryId ?? existingProduct.categoryId,
      };

      const updatedProduct = await this.productRepository.update(
        new Product(updatedProductData)
      );
      if (!updatedProduct) {
        return ServiceResult.failure<Product>(
          "Failed to update order",
          "PRODUCT_UPDATE_FAILED",
          400
        );
      }
      return ServiceResult.success<Product>(
        updatedProduct,
        "Product updated successfully.",
        200
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findProductById(productId: string): Promise<ServiceResult<Product>> {
    try {
      const product = await this.productRepository.findById(productId);
      if (!product) {
        return ServiceResult.notFound<Product>("Product not found.");
      }
      return ServiceResult.success<Product>(product, "Product found.", 200);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteProduct(productId: string): Promise<ServiceResult<Product>> {
    try {
      const result = await this.productRepository.delete(productId);
      if (!result) {
        return ServiceResult.notFound<Product>("Product not found.");
      }
      return ServiceResult.success<Product>(
        undefined as unknown as Product,
        "Product deleted",
        204
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async allProducts(): Promise<ServiceResult<Product[]>> {
    try {
      const products: Product[] = await this.productRepository.findAll();

      return ServiceResult.success<Product[]>(products, "Products found");
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default ProductService;

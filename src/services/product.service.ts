import { inject, injectable } from "inversify";
import { IProductService } from "../contracts/services/iproduct.service";
import { CreateProductDTO } from "../dtos/create-product.dto";
import { UpdateProductDTO } from "../dtos/update-product.dto";
import { Product } from "../entities/product";
import { ServiceResult } from "../responses/service-result.dto";
import { IProductRepository } from "../contracts/repositories/iproduct.repository";
import { ProductRepository } from "../repositories/product.repository";
import Storage from "../adapters/storage";

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(ProductRepository) private productRepository: IProductRepository // Inyecta el repositorio
  ) {}


  async createProduct(data: CreateProductDTO): Promise<ServiceResult<Product>> {
    const product = new Product({
      productName: data.productName,
      description: data.description,
      price: data.price,
      stock: data.stock,
      categoryId: data.categoryId,
      imageUrl: data.imageUrl,
    });

    const existAnotherProduct = await this.productRepository.findByName(
      product.productName
    );

    if (existAnotherProduct) {
      return ServiceResult.failure<Product>(
        "Failed to create product, another product exist with the same name.",
        "PRODUCT_EXIST_ANOTHER_NAME",
        400
      );
    }

    const createdProduct = await this.productRepository.create(product);

    if (!createdProduct) {
      return ServiceResult.failure<Product>(
        "Failed to create product,",
        "PRODUCT_CREATED_FAILED",
        400
      );
    }

    return ServiceResult.success<Product>(
      createdProduct,
      "Product created successfully.",
      201
    );
  }

  async updateProduct(data: UpdateProductDTO): Promise<ServiceResult<Product>> {
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
      imageUrl: data.imageUrl ?? existingProduct.imageUrl,
    };

    const updatedProduct = await this.productRepository.update(
      new Product(updatedProductData)
    );
    if (!updatedProduct) {
      return ServiceResult.failure<Product>(
        "Failed to update product",
        "PRODUCT_UPDATE_FAILED",
        400
      );
    }
    return ServiceResult.success<Product>(
      updatedProduct,
      "Product updated successfully.",
      200
    );
  }

  async findById(productId: string): Promise<ServiceResult<Product>> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      return ServiceResult.notFound<Product>("Product not found.");
    }
    return ServiceResult.success<Product>(product, "Product found.", 200);
  }

  async deleteProduct(productId: string): Promise<ServiceResult<Product>> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      return ServiceResult.notFound<Product>("Product not found.");
    }

    const storage = Storage.disk("local");

    await storage.delete(product.imageUrl!);

    await this.productRepository.delete(product.id!);

    return ServiceResult.success<Product>(
      undefined as unknown as Product,
      "Product deleted",
      204
    );
  }
  async findByCategoryId(categoryId: string): Promise<ServiceResult<Product[]>> {
    const products: Product[] = await this.productRepository.findByCategoryId(categoryId);

    return ServiceResult.success<Product[]>(products, "Products found");
  }
  async allProducts(): Promise<ServiceResult<Product[]>> {
    const products: Product[] = await this.productRepository.findAll();

    return ServiceResult.success<Product[]>(products, "Products found");
  }
}

export default ProductService;

import { Request, Response } from "express";
import { BaseController } from "../base.controller";
import { inject, injectable } from "inversify";
import { ProductService } from "../../services/product.service";
import { IProductService } from "../../contracts/services/iproduct.service";
import { CreateProductDTO } from "../../dtos/create-product.dto";
import { UpdateProductDTO } from "../../dtos/update-product.dto";
import { ServiceResult } from "../../responses/service-result.dto";
import { Product } from "../../entities/product";
import Storage from "../../adapters/storage";

@injectable()
export class ProductController extends BaseController {
  constructor(@inject(ProductService) private productService: IProductService) {
    super();
  }

  public async createProduct(req: Request, res: Response): Promise<void> {
    const { productName, description, price, stock, categoryId } = req.body;
    const imageFile = req.file;

    const storage = Storage.disk("local");

    const imageUrl = imageFile ? await storage.upload(imageFile) : undefined;

    const createProductDTO = new CreateProductDTO(
      productName,
      description,
      price,
      stock,
      categoryId,
      imageUrl
    );

    const response = await this.productService.createProduct(createProductDTO);

    return response.isSuccess
      ? this.successResponse(res, response.data, response.message)
      : this.errorResponse(res, response.message, response.status);
  }
  public async updateProduct(req: Request, res: Response): Promise<void> {
    const { productId } = req.params;
    const { productName, description, price, stock, categoryId } = req.body;
    const imageFile = req.file;

    const storage = Storage.disk("local");
    let imageUrl: string | undefined;

    // Obtener el producto actual para obtener la imagen anterior
    const productResult: ServiceResult<Product> =
      await this.productService.findById(productId);

    if (!productResult.isSuccess) {
      this.errorResponse(res, productResult.message, productResult.status);
    }

    const currentProduct = productResult.data as Product;

    if (currentProduct.imageUrl && imageFile) {
      await storage.delete(currentProduct.imageUrl);
    }

    // Subir y asignar la nueva imagen solo si se proporciona una nueva
    imageUrl = imageFile
      ? await storage.upload(imageFile)
      : currentProduct.imageUrl;

    // Solo incluye imageUrl si hay una nueva imagen para actualizar
    const updateProductDTO = new UpdateProductDTO(
      productId,
      productName,
      description,
      price,
      stock,
      categoryId,
      imageUrl
    );

    const response = await this.productService.updateProduct(updateProductDTO);

    return response.isSuccess
      ? this.successResponse(res, response.data, response.message)
      : this.errorResponse(res, response.message, response.status);
  }
  public async getProduct(req: Request, res: Response): Promise<void> {
    const { productId } = req.params;

    const response: ServiceResult<Product> =
      await this.productService.findById(productId);

    return response.isSuccess
      ? this.successResponse(res, response.data, response.message)
      : this.errorResponse(res, response.message, response.status);
  }

  public async deleteProduct(req: Request, res: Response): Promise<void> {
    const { productId } = req.params;

    const response: ServiceResult<Product> =
      await this.productService.deleteProduct(productId);

    return response.isSuccess
      ? this.successResponse(res, response.data, response.message)
      : this.errorResponse(res, response.message, response.status);
  }

  public async allProduct(req: Request, res: Response): Promise<void> {
    const response: ServiceResult<Product[]> =
      await this.productService.allProducts();

    return response.isSuccess
      ? this.successResponse(res, response.data, response.message)
      : this.errorResponse(res, response.message, response.status);
  }
}

export default ProductController;

import { Request, Response } from "express";
import { BaseController } from "../../../core/classes/base.controller";
import { inject, injectable } from "inversify";
import { ProductService } from "../services/product.service";
import { IProductService } from "../contracts/services/iproduct.service";
import { CreateProductDTO } from "../../../core/types/create-product.dto";
import { UpdateProductDTO } from "../../../core/types/update-product.dto";
import { ServiceResult } from "../../../core/responses/service-result.dto";
import { Product } from "../models/product";

@injectable()
export class ProductController extends BaseController {
  constructor(@inject(ProductService) private productService: IProductService) {
    super();
  }

  public async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { productName, description, price, stock, categoryId } = req.body;

      const createProductDTO = new CreateProductDTO(
        productName,
        description,
        price,
        stock,
        categoryId
      );

      const response: ServiceResult<Product> =
        await this.productService.createProduct(createProductDTO);

      if (response.isSuccess) {
        return this.successResponse(
          res,
          response.data,
          response.message,
          response.status
        );
      } else {
        return this.errorResponse(res, response.message, response.status);
      }
    } catch (error: any) {
      return this.errorResponse(res, "Internal Server Error", 500);
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const { productName, description, price, stock, categoryId } = req.body;

      const updateProductDTO = new UpdateProductDTO(
        productId,
        productName,
        description,
        price,
        stock,
        categoryId
      );

      const response: ServiceResult<Product> =
        await this.productService.updateProduct(updateProductDTO);

      if (response.isSuccess) {
        return this.successResponse(
          res,
          response.data,
          response.message,
          response.status
        );
      } else {
        return this.errorResponse(res, response.message, response.status);
      }
    } catch (error: any) {
      return this.errorResponse(res, "Internal Server Error", 500);
    }
  }

  public async getProduct(req: Request, res: Response): Promise<void> {
    const { productId } = req.params;

    try {
      const response: ServiceResult<Product> =
        await this.productService.findProductById(productId);

      if (!response.isSuccess) {
        return this.errorResponse(res, response.message, response.status);
      }
      return this.successResponse(
        res,
        response.data,
        response.message,
        response.status
      );
    } catch (error: any) {
      return this.errorResponse(res, "Internal Server Error", 500);
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<void> {
    const { productId } = req.params;

    try {
      const response: ServiceResult<Product> =
        await this.productService.deleteProduct(productId);

      if (!response.isSuccess) {
        return this.errorResponse(res, response.message, response.status);
      }
      return this.successResponse(
        res,
        response.data,
        response.message,
        response.status
      );
    } catch (error: any) {
      return this.errorResponse(res, "Internal Server Error", 500);
    }
  }

  public async allProduct(req: Request, res: Response): Promise<void> {
    try {
      const response: ServiceResult<Product[]> =
        await this.productService.allProducts();

      if (!response.isSuccess) {
        return this.errorResponse(res, response.message, response.status);
      }

      return this.successResponse(
        res,
        response.data,
        response.message,
        response.status
      );
    } catch (error: any) {
      return this.errorResponse(res, "Internal Server Error", 500);
    }
  }
}

export default ProductController;

import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../base.controller";
import { CategoryService } from "../../services/category.service";
import { ICategoryService } from "../../contracts/services/icategory.service";
import { ServiceResult } from "../../responses/service-result.dto";
import { Category } from "../../entities/category";
import { Product } from "../../entities/product";
import ProductService from "../../services/product.service";
import { IProductService } from "../../contracts/services/iproduct.service";

@injectable()
export class CategoryController extends BaseController {
  constructor(
    @inject(CategoryService) private categoryService: ICategoryService,
    @inject(ProductService) private productService: IProductService
  ) {
    super();
  }

  public async createCategory(req: Request, res: Response): Promise<void> {
    const { categoryName } = req.body;

    const createResponse: ServiceResult<Category> =
      await this.categoryService.createCategory(categoryName);

    if (createResponse.isSuccess) {
      return this.successResponse(
        res,
        createResponse.data,
        createResponse.message,
        createResponse.status
      );
    } else {
      return this.errorResponse(
        res,
        createResponse.message,
        createResponse.status
      );
    }
  }

  public async updateCategory(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;
    const { categoryName } = req.body;

    const updateResponse: ServiceResult<Category> =
      await this.categoryService.updateCategory(categoryId, categoryName);

    if (updateResponse.isSuccess) {
      return this.successResponse(
        res,
        updateResponse.data,
        updateResponse.message,
        updateResponse.status
      );
    } else {
      return this.errorResponse(
        res,
        updateResponse.message,
        updateResponse.status
      );
    }
  }

  public async getCategory(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;

    const categoryResponse: ServiceResult<Category> =
      await this.categoryService.findById(categoryId);

    if (categoryResponse.isSuccess) {
      return this.successResponse(
        res,
        categoryResponse.data,
        categoryResponse.message,
        200
      );
    } else {
      return this.errorResponse(
        res,
        categoryResponse.message,
        categoryResponse.status
      );
    }
  }

  public async deleteCategory(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;

    const response: ServiceResult<Category> =
      await this.categoryService.deleteCategory(categoryId);

    if (!response.isSuccess) {
      return this.errorResponse(res, response.message, response.status);
    }

    return this.successResponse(
      res,
      response.data,
      response.message,
      response.status
    );
  }
  public async allCategories(req: Request, res: Response): Promise<void> {
    const response: ServiceResult<Category[]> =
      await this.categoryService.allCategories();
    return response.isSuccess
      ? this.successResponse(res, response.data, response.message)
      : this.errorResponse(res, response.message, response.status);
  }

  public async productsByCategory(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;

    /**traemos la categoria del repositorio de categorias */
    const categoryResponse: ServiceResult<Category> =
      await this.categoryService.findById(categoryId);

    if (!categoryResponse.isSuccess) {
      return this.errorResponse(
        res,
        categoryResponse.message,
        categoryResponse.status
      );
    }
    /** traemos los productos del repositorio de productos*/
    const productsResponse: ServiceResult<Product[]> =
      await this.productService.findByCategoryId(categoryId);
    return productsResponse.isSuccess
      ? this.successResponse(
          res,
          {
            id: categoryId,
            categoryName: categoryResponse.data?.categoryName,
            products: productsResponse.data,
          },
          productsResponse.message
        )
      : this.errorResponse(
          res,
          productsResponse.message,
          productsResponse.status
        );
  }
}

export default CategoryController;

import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../../../core/classes/base.controller";
import { CategoryService } from "../services/category.service";
import { ICategoryService } from "../contracts/services/icategory.service";
import { ServiceResult } from "../../../core/responses/service-result.dto";
import { Category } from "../models/category";

@injectable()
export class CategoryController extends BaseController {
  constructor(
    @inject(CategoryService) private categoryService: ICategoryService
  ) {
    super();
  }

  public async createCategory(req: Request, res: Response): Promise<void> {
    const { categoryName } = req.body;

    try {
      const createResponse: ServiceResult<any> =
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
    } catch (error:any) {
      throw new Error(error);
    }
  }

  public async updateCategory(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;
    const { categoryName } = req.body;

    try {
      const updateResponse: ServiceResult<any> =
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
    } catch (error:any) {
      throw new Error(error);
    }
  }

  public async getCategory(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;

    try {
      const categoryResponse: ServiceResult<any> =
        await this.categoryService.getCategoryById(categoryId);

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
    } catch (error:any) {
      throw new Error(error);
    }
  }

  public async deleteCategory(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;

    try {
      const response: ServiceResult<Category> = await this.categoryService.deleteCategory(
        categoryId
      );

      if (!response.isSuccess) {
        return this.errorResponse(
          res,
          response.message,
          response.status
         );
      } 
  
      return this.successResponse(
        res,
        response.data,
        response.message,
        response.status
      );
    }catch (error:any) {
      throw new Error(error);
    }
  }
}

export default CategoryController;

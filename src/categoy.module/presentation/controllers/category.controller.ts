import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CreateCategoryCommand } from "../../application/commands/create-category.command";
import {
  errorResponse,
  successResponse,
} from "../../../shared/response.handler";
import { CategoryValidator } from "../../application/validations/category.validator";
import { GetCategoryByIdQuery } from "../../application/queries/get-category-by-id.query";
import { UpdateCategoryCommand } from "../../application/commands/update-cateogy.command";
import { DeleteCategoryCommand } from "../../application/commands/delete-category.command";

@injectable()
export class CategoryController {
  constructor(
    @inject(CreateCategoryCommand)
    private createCategoryCommand: CreateCategoryCommand,
    @inject(UpdateCategoryCommand)
    private updateCategoryCommand: UpdateCategoryCommand,
    @inject(DeleteCategoryCommand)
    private deleteCategoryCommand: DeleteCategoryCommand,
    @inject(GetCategoryByIdQuery)
    private getCategoryByIdQuery: GetCategoryByIdQuery
  ) {}

  public async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const validationError = CategoryValidator.validateCreateCategory(
        req.body
      );
      if (validationError) {
        return errorResponse(res, validationError, 400);
      }

      const { categoryName } = req.body;
      console.log(categoryName)

      const data = await this.createCategoryCommand!.execute(categoryName);

      successResponse(res, data, "Category created", 201);
    } catch (error: any) {
      // Aquí capturamos el error y lo enviamos al middleware global de manejo de errores
      console.error("Error creating category:", error);
      errorResponse(res, "Internal Server Error", 500);
    }
  }
  public async updateCategory(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;
    const { categoryName } = req.body;

    const validationError = CategoryValidator.validateUpdateCategory(
      req.body,
      categoryId
    );
    if (validationError) {
      return errorResponse(res, validationError, 400);
    }

    try {
      const category = await this.updateCategoryCommand.execute(
        categoryId,
        categoryName
      );

      if (!category) {
        return errorResponse(res, "Category not found", 404);
      }
      successResponse(res, category, "Category updated", 201);
    } catch (error: any) {
      console.error("Error updating category:", error);
      errorResponse(res, error.message || "Error interno del servidor", 500);
    }
  }

  public async getCategory(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;

    if (!categoryId || typeof categoryId !== "string") {
      return errorResponse(
        res,
        "Category ID is required and must be a valid string.",
        400
      );
    }

    try {
      const category = await this.getCategoryByIdQuery.execute(categoryId);
      if (!category) {
        return errorResponse(res, "Category not found", 404);
      }
      successResponse(res, category, "Category fetched", 200);
    } catch (error: any) {
      console.error("Error fetching category:", error);
      errorResponse(res, error.message || "Error interno del servidor", 500);
    }
  }

  public async deleteCategory(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;

    if (!categoryId || typeof categoryId !== "string") {
      return errorResponse(
        res,
        "Category ID is required and must be a string.",
        400
      );
    }

    try {
      const result = await this.deleteCategoryCommand.execute(categoryId);

      if (!result) {
        return errorResponse(res, "Category not found", 404);
      }
      successResponse(res, null, "Category deleted", 200);
    } catch (error: any) {
      console.error("Error deleting order:", error);
      errorResponse(res, error.message || "Error interno del servidor", 500);
    }
  }
}

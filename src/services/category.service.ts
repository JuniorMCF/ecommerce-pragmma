import { injectable, inject } from "inversify";
import { ICategoryService } from "../contracts/services/icategory.service";
import { Category } from "../entities/category";
import { CategoryRepository } from "../repositories/category.repository";
import { ICategoryRepository } from "../contracts/repositories/icategory.repository";
import { ServiceResult } from "../responses/service-result.dto";

@injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @inject(CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}


  async createCategory(categoryName: string): Promise<ServiceResult<Category>> {
    const category = new Category({ categoryName });

    const createdCategory = await this.categoryRepository.create(category);
    if (!createdCategory) {
      return ServiceResult.failure<Category>(
        "Failed to create category",
        "CATEGORY_CREATION_FAILED",
        400
      );
    }

    return ServiceResult.success<Category>(
      createdCategory,
      "Category created successfully",
      201
    );
  }

  async updateCategory(
    id: string,
    categoryName: string
  ): Promise<ServiceResult<Category>> {
    const existingCategory = await this.categoryRepository.findById(id);
    if (!existingCategory) {
      return ServiceResult.notFound<Category>("Category not found");
    }

    const updatedCategory = new Category({
      id,
      categoryName,
    });

    const result = await this.categoryRepository.update(updatedCategory);
    if (!result) {
      return ServiceResult.failure<Category>(
        "Failed to update category",
        "CATEGORY_UPDATE_FAILED",
        400
      );
    }

    return ServiceResult.success<Category>(
      result,
      "Category updated successfully",
      200
    );
  }

  async deleteCategory(id: string): Promise<ServiceResult<Category>> {
    const result = await this.categoryRepository.delete(id);
    if (!result) {
      return ServiceResult.notFound<Category>("Category not found.");
    }
    return ServiceResult.success<Category>(
      undefined as unknown as Category,
      "Category deleted",
      204
    );
  }

  async findById(id: string): Promise<ServiceResult<Category>> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      return ServiceResult.notFound<Category>("Category not found");
    }
    return ServiceResult.success<Category>(category, "Category found", 200);
  }
  async allCategories(): Promise<ServiceResult<Category[]>> {
    const categories: Category[] = await this.categoryRepository.findAll();

    return ServiceResult.success<Category[]>(categories, "Categories found");
  }
}

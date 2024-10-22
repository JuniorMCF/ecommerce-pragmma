import { inject, injectable } from "inversify";
import { CategoryService } from "../../infraestructure/services/category.service";
import { ICategoryService } from "../services/icategory.service";
import { Category } from "../../domain/entities/category";

@injectable()
export class GetCategoryByIdQuery {
  constructor(
    @inject(CategoryService) private categoryService: ICategoryService
  ) {}

  async execute(categoryId: string): Promise<Category | null> {
    const category = await this.categoryService.getCategoryById(categoryId);

    if (!category) {
      return null;
    }

    return category;
  }
}

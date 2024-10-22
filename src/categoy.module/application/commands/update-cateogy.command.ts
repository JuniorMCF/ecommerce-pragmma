import { injectable,inject } from "inversify";
import { CategoryService } from "../../infraestructure/services/category.service";
import { ICategoryService } from "../services/icategory.service";
import { Category } from "../../domain/entities/category";

@injectable()
export class UpdateCategoryCommand {

  constructor(
    @inject(CategoryService) private categoryService:ICategoryService
  ) {
   
  }

  async execute(
    categoryId: string,
    categoryName: string,
   
  ): Promise<Category | null> {
    

    return await this.categoryService.updateCategory(categoryId, categoryName);
  }
}

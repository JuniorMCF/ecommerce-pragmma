import { injectable,inject } from "inversify";
import { Category } from "../../domain/entities/category";
import { ICategoryService } from "../services/icategory.service";
import { CategoryService } from "../../infraestructure/services/category.service";

@injectable()
export class CreateCategoryCommand {
  constructor(
    @inject(CategoryService) private categoryService :ICategoryService
  ) {}

  async execute(
    categoryName:string
  ): Promise<Category> {

    return await this.categoryService.createCategory(categoryName);
  }
}

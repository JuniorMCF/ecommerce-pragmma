import { injectable, inject } from "inversify";

import { CategoryService } from "../../infraestructure/services/category.service";
import { ICategoryService } from "../services/icategory.service";

@injectable()
export class DeleteCategoryCommand {
  constructor(
    @inject(CategoryService) private categoryService: ICategoryService
  ) {}

  async execute(categoryId: string): Promise<Boolean> {
    return await this.categoryService.deleteCategory(categoryId);
  }
}

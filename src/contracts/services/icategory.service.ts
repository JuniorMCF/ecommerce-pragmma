import { ServiceResult } from "../../responses/service-result.dto";
import { Category } from "../../entities/category";

export interface ICategoryService {
  createCategory(categoryName: string): Promise<ServiceResult<Category>>;
  updateCategory(
    id: string,
    categoryName: string
  ): Promise<ServiceResult<Category>>;
  getCategoryById(id: string): Promise<ServiceResult<Category>>;
  deleteCategory(id: string): Promise<ServiceResult<Category>>;
}

import { injectable, inject } from "inversify";
import { ICategoryService } from "../../application/services/icategory.service";
import { Category, CategoryBuilder } from "../../domain/entities/category";
import { MongoCategoryRepository } from "../repositories/mongo-category.repository";
import { ICategoryRepository } from "../../domain/repositories/icategory.repository";

@injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @inject(MongoCategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async createCategory(categoryName: string): Promise<Category> {
    const category = new CategoryBuilder()
      .setCategoryName(categoryName)
      .build();

    return await this.categoryRepository.create(category);
  }
  async updateCategory(
    id: string,
    categoryName: string
  ): Promise<Category | null> {
    const existingOrder = await this.categoryRepository.findById(id);
    if (!existingOrder) {
      return null;
    }

    const updateCategory = new CategoryBuilder()
      .setId(id)
      .setCategoryName(categoryName)
      .build();

    return await this.categoryRepository.update(updateCategory);
  }
  async deleteCategory(id: string): Promise<Boolean> {
    return await this.categoryRepository.delete(id);
  }
  async getCategoryById(id: string): Promise<Category | null> {
    try {
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        return null;
      }
      return category;
    } catch (error) {
      console.error(`Error al buscar la categoria con ID: ${id}`, error);
      throw new Error("Error al obtener la categoria");
    }
  }
}

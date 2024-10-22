import { Category } from "../entities/category";

export interface ICategoryRepository {
    findById(id: string): Promise<Category | null>;
    create(category: Category): Promise<Category>;
    update(category: Category): Promise<Category | null>;
    delete(id: string): Promise<Boolean>;
  }
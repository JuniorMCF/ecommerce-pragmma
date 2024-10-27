import { Category } from "../../entities/category";

export interface ICategoryRepository {
    findById(id: string): Promise<Category | undefined>;
    create(category: Category): Promise<Category | undefined>;
    update(category: Category): Promise<Category | undefined>;
    delete(id: string): Promise<Boolean>;
  }
import { Category } from "../../domain/entities/category";

export interface ICategoryService{
   
    createCategory(categoryName: string): Promise<Category>;
    updateCategory(id:string,categoryName:string):Promise<Category | null>;
    deleteCategory(id:string):Promise<Boolean>;
    getCategoryById(id:string):Promise<Category | null>
}
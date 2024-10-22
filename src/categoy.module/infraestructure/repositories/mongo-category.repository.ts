
import { ObjectId, Db } from "mongodb"; // Importar Db
import { ICategoryRepository } from "../../domain/repositories/icategory.repository";
import { Category, CategoryBuilder } from "../../domain/entities/category";

export class MongoCategoryRepository implements ICategoryRepository {
  private collection;

  constructor(db: Db) {
     this.collection = db.collection("categories");
  }


  async findById(orderId: string): Promise<Category | null> {
    if (!ObjectId.isValid(orderId)) {
        return null;
    }

    const result = await this.collection.findOne({ _id: new ObjectId(orderId) });
    if (!result) return null;


    const order = new CategoryBuilder()
      .setId(result._id.toString())
       .setCategoryName(result.categoryName)
      .build();

    return order;
  }

  
  async create(category: Category): Promise<Category> {
    const newCategory = {
      categoryName:category.categoryName,
      createdAt: new Date(),
    };
    const result = await this.collection.insertOne(newCategory);
  
    
    return {
      ...newCategory,
      id: result.insertedId.toString() 
    } as Category;
  }

 
  async update(category: Category): Promise<Category> {
    const updatedCategory = {
      id: category.id!,
      categoryName:category.categoryName,

      
    };
    await this.collection.updateOne(
      { _id: new ObjectId(category.id) }, 
      { $set: updatedCategory }
    );
    return {
        ...updatedCategory,
        
    } as Category;
  }


  async delete(categoryId: string): Promise<Boolean> {
    if (!ObjectId.isValid(categoryId)) {
        return false;
    }
    const result = await this.collection.findOne({ _id: new ObjectId(categoryId) });
    if (!result) return false;

    await this.collection.deleteOne({ _id: new ObjectId(categoryId) });

    return true
  }
}

import { ObjectId, Db } from "mongodb"; 
import { ICategoryRepository } from "../contracts/repositories/icategory.repository";
import { Category } from "../models/category";
import { injectable, inject } from "inversify";
/* import { Server as SocketIoServer } from "socket.io"; */

@injectable()
export class CategoryRepository implements ICategoryRepository {
  private collection;

  constructor(
    @inject(Db) private db: Db,
    /* @inject(SocketIoServer) private io: SocketIoServer */
  ) {
    this.collection = this.db.collection("categories");
  }

  async findById(categoryId: string): Promise<Category | undefined> {
    if (!ObjectId.isValid(categoryId)) {
      return undefined;
    }

    const result = await this.collection.findOne({
      _id: new ObjectId(categoryId),
    });
    if (!result) return undefined;

    return new Category({
      id: result._id.toString(),
      categoryName: result.categoryName,
    });
  }

  async create(category: Category): Promise<Category> {
    const newCategory = {
      categoryName: category.categoryName,
      createdAt: new Date(),
    };
    const result = await this.collection.insertOne(newCategory);

    return new Category({
      id: result.insertedId.toString(),
      categoryName: newCategory.categoryName,
    });
  }

  async update(category: Category): Promise<Category> {
    const updatedCategory = {
      categoryName: category.categoryName,
    };

    await this.collection.updateOne(
      { _id: new ObjectId(category.id!) },
      { $set: updatedCategory }
    );

    return new Category({
      id: category.id,
      categoryName: updatedCategory.categoryName,
    });
  }

  async delete(categoryId: string): Promise<boolean> {
    if (!ObjectId.isValid(categoryId)) {
      return false;
    }

    const result = await this.collection.findOne({
      _id: new ObjectId(categoryId),
    });
    if (!result) return false;

    await this.collection.deleteOne({ _id: new ObjectId(categoryId) });

    return true;
  }
}

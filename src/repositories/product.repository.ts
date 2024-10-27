import { Db, ObjectId } from "mongodb";
import { IProductRepository } from "../contracts/repositories/iproduct.repository";
import { Product } from "../entities/product";
import { inject, injectable } from "inversify";

@injectable()
export class ProductRepository implements IProductRepository {
  private collection;
  constructor(@inject(Db) private db: Db) {
    this.collection = this.db.collection("products");
  }

  async findById(productId: string): Promise<Product | undefined> {
    if (!ObjectId.isValid(productId)) {
      return undefined;
    }

    const result = await this.collection.findOne({
      _id: new ObjectId(productId),
    });
    if (!result) return undefined;

    return new Product({
      id: result._id.toString(),
      productName: result.productName,
      description: result.description,
      price: result.price,
      stock: result.stock,
      categoryId: result.categoryId,
    });
  }
  async create(product: Product): Promise<Product | undefined> {
    const newProduct = {
      productName: product.productName,
      description: product.description,
      stock: product.stock,
      price: product.price,
      categoryId: product.categoryId,
    };

    const result = await this.collection.insertOne(newProduct);

    return new Product({
      ...newProduct,
      id: result.insertedId.toString(),
    });
  }
  async update(product: Product): Promise<Product | undefined> {
    const updateProduct = {
      productName: product.productName,
      description: product.description,
      stock: product.stock,
      price: product.price,
      categoryId: product.categoryId,
    };
    await this.collection.updateOne(
      { _id: new ObjectId(product.id) },
      { $set: updateProduct }
    );

    return new Product({
      ...updateProduct,
      id: product.id,
    });
  }
  async delete(productId: string): Promise<Boolean> {
    if (!ObjectId.isValid(productId)) {
      return false;
    }

    const result = await this.collection.findOne({
      _id: new ObjectId(productId),
    });
    if (!result) return false;

    await this.collection.deleteOne({ _id: new ObjectId(productId) });

    return true;
  }
  async findAll(): Promise<Product[]> {
    const result = await this.collection.find().toArray();

    const products: Product[] = result.map(
      (doc) =>
        new Product({
          id: doc._id.toString(),
          productName: doc.productName,
          description: doc.description,
          price: doc.price,
          stock: doc.stock,
          categoryId: doc.categoryId,
        })
    );

    return products;
  }
}

import { inject, injectable } from "inversify";
import { Db, ObjectId } from "mongodb";
import { ICartRepository } from "../contracts/repositories/icart.repository";
import { Cart } from "../entities/cart";
import { CartDetail } from "../entities/cart-detail";

@injectable()
export class CartRepository implements ICartRepository {
  private collection;

  constructor(@inject(Db) private db: Db) {
    this.collection = this.db.collection("carts");
  }


  async addToCart(
    userId: string,
    productId: string,
    quantity: number,
    price: number
  ): Promise<Cart | undefined> {
    const filter = { userId };

    const update: any = {
      $setOnInsert: { createdAt: new Date(), userId },
      $set: { updatedAt: new Date() },
      $push: {
        cartDetails: {
          productId,
          quantity,
          price,
        } as any,
      },
    };

    const options = { upsert: true, returnDocument: "after" as const };
    const result = await this.collection.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (!result || !result.value) return undefined;

    const cart = new Cart({
      id: result.value._id.toString(),
      userId: result.value.userId,
      createdAt: result.value.createdAt,
      updatedAt: result.value.updatedAt,
      cartDetails: (result.value.cartDetails || []).map(
        (item: any) =>
          new CartDetail({
            id: item._id?.toString(),
            cartId: result.value._id.toString(),
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })
      ),
    });

    return cart;
  }

  async removeFromCart(
    userId: string,
    productId: string
  ): Promise<Cart | undefined> {
    const filter = { userId };
    const update: any = {
      $set: { updatedAt: new Date() },
      $pull: { cartDetails: { productId } }, // Remove the product entirely from cartDetails
    };
    const options = { returnDocument: "after" as const };

    const result = await this.collection.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (!result || !result.value) return undefined;

    const cart = new Cart({
      id: result.value._id.toString(),
      userId: result.value.userId,
      createdAt: result.value.createdAt,
      updatedAt: result.value.updatedAt,
      cartDetails: (result.value.cartDetails || []).map(
        (item: any) =>
          new CartDetail({
            id: item._id?.toString(),
            cartId: result.value._id.toString(),
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })
      ),
    });

    return cart;
  }

  async getCart(userId: string): Promise<Cart | undefined> {
    const result = await this.collection.findOne({ userId });

    if (!result) return undefined;

    const cart = new Cart({
      id: result._id.toString(),
      userId: result.userId,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      cartDetails: (result.cartDetails || []).map(
        (item: any) =>
          new CartDetail({
            id: item._id?.toString(),
            cartId: result._id.toString(),
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })
      ),
    });

    return cart;
  }
  async clearCart(userId: string): Promise<Boolean | undefined> {
    const result = await this.collection.deleteOne({ userId });

    if (!result) return undefined;

    return result.deletedCount === 1;
  }
}

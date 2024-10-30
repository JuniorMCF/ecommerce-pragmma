import { inject, injectable } from "inversify";
import { Db, ObjectId, UpdateFilter } from "mongodb";
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
    price: number,
    productName: string, // Nuevo parámetro
    productDescription: string // Nuevo parámetro
  ): Promise<Cart | undefined> {
    // Primero, intenta actualizar la cantidad si el producto ya existe en `cartDetails`
    const updateExistingProduct: UpdateFilter<any> = {
      $set: {
        updatedAt: new Date(),
        "cartDetails.$[elem].quantity": quantity, // Actualiza la cantidad directamente
      },
    };

    const options = {
      arrayFilters: [{ "elem.productId": productId }],
      returnDocument: "after" as const,
    };

    const result = await this.collection.findOneAndUpdate(
      { userId, "cartDetails.productId": productId },
      updateExistingProduct,
      options
    );

    // Si la cantidad es 0, elimina el producto del carrito
    if (quantity === 0 && result) {
      const removeProduct: UpdateFilter<any> = {
        $set: { updatedAt: new Date() },
        $pull: { cartDetails: { productId } } as any, // Elimina el producto del carrito
      };

      await this.collection.findOneAndUpdate({ userId }, removeProduct, {
        returnDocument: "after" as const,
      });

      // Retornamos el carrito actualizado
      const updatedCart = await this.collection.findOne({ userId });
      if (!updatedCart) return undefined;

      return {
        id: updatedCart._id.toString(),
        userId: updatedCart.userId,
        createdAt: updatedCart.createdAt,
        updatedAt: updatedCart.updatedAt,
        cartDetails: (updatedCart.cartDetails || []).map((item: any) => ({
          id: item._id?.toString(),
          cartId: updatedCart._id.toString(),
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          productName: item.productName, // Agrega el nombre del producto
          productDescription: item.productDescription, // Agrega la descripción del producto
        })),
      };
    }

    // Si no se encontró el producto en `cartDetails`, lo añade como nuevo
    if (!result) {
      const addNewProduct: UpdateFilter<any> = {
        $setOnInsert: { createdAt: new Date(), userId },
        $set: { updatedAt: new Date() },
        $push: {
          cartDetails: {
            productId,
            quantity,
            price,
            productName, // Agrega el nombre del producto
            productDescription, // Agrega la descripción del producto
          } as any,
        },
      };

      await this.collection.findOneAndUpdate({ userId }, addNewProduct, {
        upsert: true,
        returnDocument: "after" as const,
      });
    }

    // Retornamos el carrito actualizado
    const updatedCart = await this.collection.findOne({ userId });
    if (!updatedCart) return undefined;

    return {
      id: updatedCart._id.toString(),
      userId: updatedCart.userId,
      createdAt: updatedCart.createdAt,
      updatedAt: updatedCart.updatedAt,
      cartDetails: (updatedCart.cartDetails || []).map((item: any) => ({
        id: item._id?.toString(),
        cartId: updatedCart._id.toString(),
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        productName: item.productName, // Incluye el nombre del producto
        productDescription: item.productDescription, // Incluye la descripción del producto
      })),
    };
  }

  async removeFromCart(
    userId: string,
    productId: string
  ): Promise<Cart | undefined> {


    // Check if the cart exists for the user
    const cart = await this.collection.findOne({ userId });
    //console.log("Retrieved cart:", cart);

    if (!cart) {
      
      return undefined; // If the cart does not exist, return undefined
    }

    // Check if the product exists in the cart
    const productExists = cart.cartDetails.some(
      (item: any) => item.productId === productId
    );

    if (!productExists) {
     
      return undefined; // If the product is not found, return undefined
    }

    // Proceed to remove the product
    const update: any = {
      $set: { updatedAt: new Date() },
      $pull: { cartDetails: { productId } }, // Remove the product from the cart
    };

    await this.collection.findOneAndUpdate({ userId }, update, {
      returnDocument: "after" as const,
    });

   

    return this.getCart(userId);
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
            productName: item.productName,
            productDescription: item.productDescription,
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

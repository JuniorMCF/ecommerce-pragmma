import { Cart } from "../../entities/cart";

export interface ICartRepository {
  addToCart(userId: string, productId: string, quantity: number, price: number): Promise<Cart | undefined>;
  removeFromCart(userId: string, productId: string, quantity: number): Promise<Cart | undefined>;
  clearCart(userId:string): Promise<Boolean | undefined>;
  getCart(userId: string): Promise<Cart | undefined>;
}


import { CartDetail } from "./cart-detail";

export class Cart {
  id?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  cartDetails: CartDetail[];

  constructor(data: Partial<Cart>) {
    this.id = data.id;
    this.userId = data.userId!;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.cartDetails = data.cartDetails || [];
  }
}

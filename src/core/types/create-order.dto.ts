import { Product } from "../../app/order/models/product";

export class CreateOrderDTO {
  userId: string;
  total: number;
  paymentMethod: string;
  deliveryMethod: string;
  products: Product[];

  constructor(
    userId: string,
    paymentMethod: string,
    deliveryMethod: string,
    products: Product[]
  ) {
    this.userId = userId;
    this.paymentMethod = paymentMethod;
    this.deliveryMethod = deliveryMethod;
    this.products = products;
    this.total = this.products.reduce((subtotal, product) => {
      return subtotal + product.price * product.quantity;
    }, 0);
  }
}

import { Product } from "../../app/order/models/product";

export class UpdateOrderDTO {
  userId: string;
  total: number;
  paymentMethod: string;
  deliveryMethod: string;
  status:string;
  products: Product[];

  constructor(
    userId: string,
    paymentMethod: string,
    deliveryMethod: string,
    status:string,
    products: Product[]
  ) {
    this.userId = userId;
    this.paymentMethod = paymentMethod;
    this.deliveryMethod = deliveryMethod;
    this.products = products;
    this.status = status;
    this.total = this.products.reduce((subtotal, product) => {
      return subtotal + product.price * product.quantity;
    }, 0);
  }
}

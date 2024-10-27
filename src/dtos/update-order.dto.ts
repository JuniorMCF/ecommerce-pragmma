import { ProductOrder } from "../entities/product-order";

export class UpdateOrderDTO {
  userId: string;
  total: number;
  paymentMethod: string;
  deliveryMethod: string;
  status:string;
  products: ProductOrder[];

  constructor(
    userId: string,
    paymentMethod: string,
    deliveryMethod: string,
    status:string,
    products: ProductOrder[]
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

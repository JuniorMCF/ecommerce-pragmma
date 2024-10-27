// order.ts
import { OrderDetail } from "./order-detail";

export class Order {
  id?: string;
  total: number;
  userId: string;
  paymentMethod: string;
  deliveryMethod: string;
  status?: string;
  createdAt: Date;
  orderDetails: OrderDetail[];

  constructor(data: Partial<Order>) {
    this.id = data.id;
    this.total = data.total!;
    this.userId = data.userId!;
    this.paymentMethod = data.paymentMethod || "efectivo";
    this.deliveryMethod = data.deliveryMethod || "store";
    this.status = data.status || "pendiente";
    this.createdAt = data.createdAt || new Date();
    this.orderDetails = data.orderDetails || [];
  }
}

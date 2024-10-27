// order-detail.ts
export class OrderDetail {
  salesOrderId?: string;
  productId: string;
  quantity: number;
  price: number;

  constructor(data: Partial<OrderDetail>) {
    this.salesOrderId = data.salesOrderId;
    this.productId = data.productId!;
    this.quantity = data.quantity!;
    this.price = data.price!;
  }
}

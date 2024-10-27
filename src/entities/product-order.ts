export class ProductOrder {
  id: string;
  quantity: number;
  price: number;

  constructor(data: Partial<ProductOrder>) {
    this.id = data.id!;
    this.quantity = data.quantity || 1;
    this.price = data.price || 0;
  }
}

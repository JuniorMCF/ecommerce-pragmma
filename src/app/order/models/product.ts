export class Product {
  id: string;
  quantity: number;
  price: number;

  constructor(data: Partial<Product>) {
    this.id = data.id!;
    this.quantity = data.quantity || 1;
    this.price = data.price || 0;
  }
}

export class Product {
  id: string;
  quantity: number;
  price: number;

  constructor(id: string, quantity: number, price: number) {
    this.id = id;
    this.quantity = quantity;
    this.price = price;
  }
}

export class CartDetail {
  id?: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
  productName?:string;
  productDescription?:string;

  constructor(data: Partial<CartDetail>) {
    this.id = data.id;
    this.cartId = data.cartId!;
    this.productId = data.productId!;
    this.quantity = data.quantity || 1;
    this.price = data.price || 0;
    this.productName = data.productName
    this.productDescription = data.productDescription
  }
}

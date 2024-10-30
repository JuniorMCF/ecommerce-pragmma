export class ProductOrder {
  id: string;
  productId?:string;
  quantity: number;
  price: number;
  productName?:string;
  productDescription?:string;
  cartId?:string;

  constructor(data: Partial<ProductOrder>) {
    this.id = data.id!;
    this.productId = data.productId
    this.quantity = data.quantity || 1;
    this.price = data.price || 0;
    this.cartId = data.cartId
    this.productDescription = data.productDescription
    this.productName = data.productName
  }
}

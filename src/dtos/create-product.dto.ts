export class CreateProductDTO {
  productName: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;

  constructor(
    productName: string,
    description: string,
    price: number,
    stock: number,
    categoryId: string
  ) {
    this.productName = productName;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.categoryId = categoryId;
  }
}

export class CreateProductDTO {
  productName: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl?: string;

  constructor(
    productName: string,
    description: string,
    price: number,
    stock: number,
    categoryId: string,
    imageUrl?: string
  ) {
    this.productName = productName;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.categoryId = categoryId;
    this.imageUrl = imageUrl;
  }
}

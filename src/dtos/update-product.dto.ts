export class UpdateProductDTO {
  id: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl?: string;

  constructor(
    id: string,
    productName: string,
    description: string,
    price: number,
    stock: number,
    categoryId: string,
    imageUrl?: string
  ) {
    this.id = id;
    this.productName = productName;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.categoryId = categoryId;
    this.imageUrl = imageUrl;
  }
}

export class Product {
  id?: string;
  productName: string;
  description: string;
  price: number;
  stock?: number;
  categoryId?:string;
  imageUrl?:string;

  constructor(data: Partial<Product>) {
    this.productName = data.productName!;
    this.description = data.description!;
    this.price = data.price!;
    this.stock = data.stock;
    this.id = data.id;
    this.categoryId = data.categoryId
    this.imageUrl = data.imageUrl
  }
}

export class OrderDetail {
  salesOrderId?: string;
  productId: string;
  quantity: number;
  price: number;

  constructor(builder: OrderDetailBuilder) {
    this.salesOrderId = builder.salesOrderId!;
    this.productId = builder.productId!;
    this.quantity = builder.quantity!;
    this.price = builder.price!;
  }
}

export class OrderDetailBuilder {
  salesOrderId?: string;
  productId?: string;
  quantity?: number;
  price?: number;

  setSalesOrderId(salesOrderId: string): OrderDetailBuilder {
    this.salesOrderId = salesOrderId;
    return this;
  }

  setProductId(productId: string): OrderDetailBuilder {
    this.productId = productId;
    return this;
  }

  setQuantity(quantity: number): OrderDetailBuilder {
    this.quantity = quantity;
    return this;
  }

  setPrice(price: number): OrderDetailBuilder {
    this.price = price;
    return this;
  }

  build(): OrderDetail {
   
    if (!this.productId || !this.quantity || !this.price) {
      throw new Error("Los campos 'productId', 'quantity' y 'price' son obligatorios.");
    }
    return new OrderDetail(this);
  }
}

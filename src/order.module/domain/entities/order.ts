import { OrderDetail } from "./order-detail";

export class Order {
  id?: string;
  total: number;
  userId: string;
  paymentMethod: string;
  deliveryMethod: string;
  status?:string;
  createdAt: Date;
  orderDetails: OrderDetail[];

  constructor(builder: OrderBuilder) {
    this.id = builder.id!;
    this.total = builder.total!;
    this.userId = builder.userId!;
    this.paymentMethod = builder.paymentMethod!;
    this.deliveryMethod = builder.deliveryMethod!;
    this.status = builder.status
    this.createdAt = builder.createdAt!;
    this.orderDetails = builder.orderDetails!;
  }
}

export class OrderBuilder {
  id?: string;
  total?: number;
  userId?: string;
  paymentMethod: string = 'efectivo';
  deliveryMethod: string = "store";
  status?:string = 'pendiente';
  createdAt: Date = new Date();
  orderDetails: OrderDetail[] = [];

  setId(id: string): OrderBuilder {
    this.id = id;
    return this;
  }

  setTotal(total: number): OrderBuilder {
    this.total = total;
    return this;
  }

  setUserId(userId: string): OrderBuilder {
    this.userId = userId;
    return this;
  }

  setPaymentMethod(paymentMethod: string): OrderBuilder {
    this.paymentMethod = paymentMethod;
    return this;
  }

  setDeliveryMethod(deliveryMethod: string): OrderBuilder {
    this.deliveryMethod = deliveryMethod;
    return this;
  }

  setStatus(status:string):OrderBuilder{
    this.status = status
    return this;
  }
  setCreatedAt(createdAt: Date): OrderBuilder {
    this.createdAt = createdAt;
    return this;
  }

  setOrderDetails(orderDetails: OrderDetail[]): OrderBuilder {
    this.orderDetails = orderDetails;
    return this;
  }
  

  build(): Order {
    
    if (!this.total || !this.userId) {
      throw new Error("Los campos 'total' y 'userId' son obligatorios.");
    }
    return new Order(this);
  }
}

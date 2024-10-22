import { IOrderRepository } from "../../domain/repositories/iorder.repository";
import { Order, OrderBuilder } from "../../domain/entities/order";
import { ObjectId, Db } from "mongodb"; // Importar Db

export class MongoOrderRepository implements IOrderRepository {
  private collection;

  constructor(db: Db) {
     this.collection = db.collection("orders");
  }


  async findById(orderId: string): Promise<Order | null> {
    if (!ObjectId.isValid(orderId)) {
        return null;
    }

    const result = await this.collection.findOne({ _id: new ObjectId(orderId) });
    if (!result) return null;


    const order = new OrderBuilder()
      .setId(result._id.toString())
      .setTotal(result.total)
      .setUserId(result.userId)
      .setPaymentMethod(result.paymentMethod)
      .setDeliveryMethod(result.deliveryMethod)
      .setOrderDetails(result.orderDetails)
      .build();

    return order;
  }

  
  async create(order: Order): Promise<Order> {
    const newOrder = {
      userId: order.userId,
      total:order.total,
      paymentMethod: order.paymentMethod,
      deliveryMethod: order.deliveryMethod,
      orderDetails: order.orderDetails,
      status:order.status,
      createdAt: new Date(),
    };
    const result = await this.collection.insertOne(newOrder);
  
    
    return {
      ...newOrder,
      id: result.insertedId.toString() 
    } as Order;
  }

 
  async update(order: Order): Promise<Order> {
    const updatedOrder = {
      userId: order.userId,
      paymentMethod: order.paymentMethod,
      deliveryMethod: order.deliveryMethod,
      orderDetails: order.orderDetails,
      status:order.status,
      createdAt: order.createdAt,
      id:order.id
    };
    await this.collection.updateOne(
      { _id: new ObjectId(order.id) }, 
      { $set: updatedOrder }
    );
    return {
        ...updatedOrder,
        
    } as Order;
  }


  async delete(orderId: string): Promise<Boolean> {
    if (!ObjectId.isValid(orderId)) {
        return false;
    }
    const result = await this.collection.findOne({ _id: new ObjectId(orderId) });
    if (!result) return false;

    await this.collection.deleteOne({ _id: new ObjectId(orderId) });

    return true
  }
}

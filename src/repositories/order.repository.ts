import { injectable, inject } from "inversify";
import { IOrderRepository } from "../contracts/repositories/iorder.repository";
import { Order } from "../entities/order";
import { ObjectId, Db } from "mongodb";
import { Server as SocketIOServer } from "socket.io";
import { OrderDetail } from "../entities/order-detail";

@injectable()
export class OrderRepository implements IOrderRepository {
  private collection;

  constructor(
    @inject(Db) private db: Db,
    @inject(SocketIOServer) private io: SocketIOServer
  ) {
    this.collection = this.db.collection("orders");
  }

  async create(order: Order): Promise<Order> {
    // Crear la orden principal
    const newOrder = {
      userId: order.userId,
      total: order.total,
      paymentMethod: order.paymentMethod,
      deliveryMethod: order.deliveryMethod,
      status: order.status,
      createdAt: new Date(),
      orderDetails: order.orderDetails.map((detail) => ({
        ...detail,
        salesOrderId: undefined, // Esto será asignado más tarde
      })),
    };

    // Insertar la orden principal
    const result = await this.collection.insertOne(newOrder);

    // Ahora asigna el salesOrderId a cada OrderDetail
    const orderDetailsWithSalesOrderId = newOrder.orderDetails.map((detail) => {
      return {
        ...detail,
        salesOrderId: result.insertedId.toString(), // Asignar el ID de la orden creada
      };
    });

    // Actualizar la orden creada con los detalles de la orden
    const createdOrder = new Order({
      ...newOrder,
      id: result.insertedId.toString(),
      orderDetails: orderDetailsWithSalesOrderId, // Actualiza la propiedad orderDetails
    });

    // Actualizar el documento en la colección para incluir los salesOrderId
    await this.collection.updateOne(
      { _id: result.insertedId },
      { $set: { orderDetails: orderDetailsWithSalesOrderId } }
    );

    this.io.emit("CreateOrder", createdOrder);

    return createdOrder;
  }

  async findById(orderId: string): Promise<Order | undefined> {
    if (!ObjectId.isValid(orderId)) {
      return undefined;
    }

    const result = await this.collection.findOne({
      _id: new ObjectId(orderId),
    });
    if (!result) return undefined;

    const order = new Order({
      id: result._id.toString(),
      userId: result.userId,
      total: result.total,
      paymentMethod: result.paymentMethod,
      deliveryMethod: result.deliveryMethod,
      orderDetails: result.orderDetails,
      status: result.status,
      createdAt: result.createdAt,
    });

    return order;
  }

  async update(order: Order): Promise<Order> {
    const updateOrder = {
      userId: order.userId,
      total: order.total,
      paymentMethod: order.paymentMethod,
      deliveryMethod: order.deliveryMethod,
      orderDetails: order.orderDetails,
      status: order.status,
      createdAt: order.createdAt,
    };

    await this.collection.updateOne(
      { _id: new ObjectId(order.id) },
      { $set: updateOrder }
    );

    const updatedOrder = new Order({
      ...updateOrder,
      id: order.id,
    });
    // Emitir evento de Socket.IO
    this.io.emit("UpdateOrder", updatedOrder);

    return updatedOrder;
  }

  async delete(orderId: string): Promise<Boolean> {
    if (!ObjectId.isValid(orderId)) {
      return false;
    }

    const result = await this.collection.findOne({
      _id: new ObjectId(orderId),
    });
    if (!result) return false;

    await this.collection.deleteOne({ _id: new ObjectId(orderId) });

    this.io.emit("DeleteOrder", orderId);

    return true;
  }
}

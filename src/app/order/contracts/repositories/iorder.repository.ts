import { Order } from "../../models/order";

export interface IOrderRepository {
    findById(id: string): Promise<Order | undefined>;
    create(order: Order): Promise<Order | undefined>;
    update(order: Order): Promise<Order | undefined>;
    delete(id: string): Promise<Boolean>;
  }
import { Order } from "../entities/order";

export interface OrderRepository {
    findById(id: string): Promise<Order | null>;
    create(order: Order): Promise<Order>;
    update(order: Order): Promise<Order | null>;
    delete(id: string): Promise<Boolean>;
  }
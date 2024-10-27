import { Socket, Server } from "socket.io";

export default function registerOrderEvents(io: Server, socket: Socket) {
  const newOrder = async (order: any) => {
    console.log("created order: ", order);
  };

  const updateOrder = async (order: any) => {
    console.log("updated order: ", order);
  };

  const deleteOrder = async (orderId: string) => {
    console.log("deleted order with id: ", orderId);
  };

  // Escuchar los eventos del socket
  socket.on("CreateOrder", newOrder);
  socket.on("UpdateOrder", updateOrder);
  socket.on("DeleteOrder", deleteOrder);
}

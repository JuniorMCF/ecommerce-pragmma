import { Server as SocketIOServer } from "socket.io";
import registerOrderEvents from "./core/events/order.event"; 

const setupSocket = (io: SocketIOServer) => {
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    // all events register
    registerOrderEvents(io, socket);

    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
};

export default setupSocket;

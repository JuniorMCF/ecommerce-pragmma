import "reflect-metadata";
import http from "http";
import express from "express";
import { Server as SocketIOServer } from "socket.io";
import setupSocket from "./socket";
import appConfig from "./core/config/app.config";
import createServer from "./server";

(async () => {
  try {
    // Crear el servidor HTTP
    const server = http.createServer();

    // Configurar Socket.IO
    const io = new SocketIOServer(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    setupSocket(io);

    // Crear la aplicación Express y el contenedor
    const { app, container } = await createServer(io);

    // Montar la aplicación Express en el servidor HTTP
    server.on("request", app);

    // Iniciar el servidor HTTP/WebSocket
    const httpPort: number = appConfig.port as number;
    server.listen(httpPort, () => {
      console.log(`Servidor corriendo en el puerto ${httpPort}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
  }
})();

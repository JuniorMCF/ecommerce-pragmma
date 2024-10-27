import "reflect-metadata";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import setupSocket from "./socket";
import appConfig from "./config/app.config";
import createServer from "./server";
import { Container } from "inversify";
import { appContainer } from "./containers/app.container";
import apiRoutes from "./routes/routes";
import ErrorMiddleware from "./middlewares/error.middleware";
import NotFoundMiddleware from "./middlewares/notfound.middleware";

(async () => {
  try {
    // Crear el servidor HTTP
    const { app } = await createServer();

    const server = http.createServer(app);

    // Configurar Socket.IO
    const io = new SocketIOServer(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    setupSocket(io);

    const container: Container = await appContainer(io);

    // Rutas de la API
    app.use("/api", apiRoutes(container));

    app.use(NotFoundMiddleware.handle);
    app.use(ErrorMiddleware.handle);

    const httpPort: number = appConfig.port as number;

    server.listen(httpPort, () => {
      console.log(`Servidor corriendo en el puerto ${httpPort}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
  }
})();

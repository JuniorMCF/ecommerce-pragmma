import "reflect-metadata";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import setupSocket from "./socket";
import appConfig from "./config/app.config";
import createServer from "./server";
import { Container } from "inversify";
import { appContainer } from "./containers/app.container";
import apiRoutesV1 from "./routes/api_v1.routes";
import NotFoundMiddleware from "./middlewares/notfound.middleware";
import setupSwagger from "./swagger/swagger";
import ErrorMiddleware from "./middlewares/error.middleware";
import AppProvider from "./providers/service.provider";

AppProvider.register();

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
    app.use("/api/v1", apiRoutesV1(container));

    // config swagger for routes api
    setupSwagger(app);

    app.use(ErrorMiddleware.errorConverter);
    app.use(ErrorMiddleware.errorHandler);
    app.use(NotFoundMiddleware.handle);

    const httpPort: number = appConfig.port as number;

    server.listen(httpPort, () => {
      console.log(`Servidor corriendo en el puerto ${httpPort}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
  }
})();

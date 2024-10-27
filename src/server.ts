import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { Container } from "inversify";
import { appContainer } from "./app.container"; 
import apiRoutes from "./routes";
import ErrorMiddleware from "./core/middlewares/error.middleware"; 
import { Server as SocketIOServer } from "socket.io";

const createServer = async (io: SocketIOServer): Promise<{ app: express.Express; container: Container }> => {
  const app = express();
  const container: Container = await appContainer(io); 

  // Middlewares
  app.use(cors({ origin: "*", credentials: true }));
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cookieParser());

  // Rutas de la API
  app.use("/api", apiRoutes(container));

  app.all("*", (req, res) => {
    res.status(404).send({ status: 404, message: "Page not found" });
  });

  app.use(ErrorMiddleware.globalErrorHandler);

  return { app, container }; 
};

export default createServer;

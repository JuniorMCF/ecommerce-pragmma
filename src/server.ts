import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const createServer = async (): Promise<{ app: express.Express }> => {
  const app = express();

  // Middlewares
  app.use(cors({ origin: "*", credentials: true }));
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cookieParser());

  return { app }; 
};

export default createServer;

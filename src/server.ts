import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import storageConfig from "./config/storage.config";

const createServer = async (): Promise<{ app: express.Express }> => {
  const app = express();

  // Middlewares
  app.use(cors({ origin: "*", credentials: true }));
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cookieParser());

  app.use(
    "/uploads",
    express.static(path.join(__dirname, `.${storageConfig.localPath}`))
  );

  return { app };
};

export default createServer;

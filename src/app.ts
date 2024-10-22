import 'reflect-metadata';
import express from 'express';
import { initializeContainer } from './shared/config/container.config'; 
import orderRoutes from './order.module/presentation/routes/order.router';
import authRoutes from './auth.module/presentation/routes/auth.router';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


initializeContainer().then((container) => {

  app.use('/api/orders', orderRoutes(container));
  app.use('/api/auth', authRoutes(container));

}).catch((error) => {
  console.error("Error initializing container:", error);
});

export default app
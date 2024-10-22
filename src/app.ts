import 'reflect-metadata';
import express from 'express';
import { initializeContainer } from './shared/config/container.config'; 
import orderRoutes from './order.module/presentation/routes/order.router';
import authRoutes from './auth.module/presentation/routes/auth.router';
import categoryRoutes from './categoy.module/presentation/routes/category.router'
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


initializeContainer().then((container) => {

  app.use('/api/orders', orderRoutes(container));
  app.use('/api/categories',categoryRoutes(container));
  //app.use('/api/auth', authRoutes(container));

}).catch((error) => {
  console.error("Error initializing container:", error);
});

export default app
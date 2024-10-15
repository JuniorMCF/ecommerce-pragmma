import express from 'express';
import routes from './auth.module/presentation/routes';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(cors())


app.use('/api', routes); 
app.use(morgan('dev'));


app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export default app;
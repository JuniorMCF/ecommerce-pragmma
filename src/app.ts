import express, { Application } from 'express';
import routes from './presentation/routes';

const app: Application = express();


app.use('/api', routes); 


app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export default app;
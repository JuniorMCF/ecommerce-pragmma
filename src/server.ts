import app from './app';
import server from './config/app'
import { connectToDatabase } from './config/database'

const port = server.port

const startServer = async () => {
  await connectToDatabase(); // Connect to database before to start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();


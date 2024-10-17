import app from './app';
import server from './config/app'

const port = server.port

const startServer = async () => {
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();


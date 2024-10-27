import { Container } from "inversify";
import { connectToDatabase } from "../database/mongo-database";
import orderContainer from "./modules/order.container";
import categoryContainer from "./modules/category.container";
import authContainer from "./modules/auth.container";
import productContainer from "./modules/product.container";
import { Server as SocketIoServer } from 'socket.io';

export const appContainer = async (io: SocketIoServer): Promise<Container> => {
  const container = new Container();

  try {
    await connectToDatabase();
    
    //injectar socket io instance for get in repositories
    container.bind<SocketIoServer>(SocketIoServer).toConstantValue(io);

    // Registrar contenedores 
    authContainer(container);
    orderContainer(container);
    categoryContainer(container);
    productContainer(container);
  } catch (error) {
    console.error("Error al conectar la base de datos:", error);
    throw error;
  }

  return container;
};

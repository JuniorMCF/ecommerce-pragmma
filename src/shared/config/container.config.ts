import { Container } from "inversify";

import categoryBinding from "../bindings/category.binding";

import { connectToDatabase } from "../../auth.module/infraestructure/database/Database"; 
import { Db } from 'mongodb';

import orderBinding from "../bindings/order.binding";
import authBinding from "../bindings/auth.binding";


const container = new Container();

// Función para inicializar las dependencias
export const initializeContainer = async (): Promise<Container> => {
  const db: Db = await connectToDatabase();

  // Registrar los bindings
  authBinding(container,db)
  orderBinding(container, db);
  categoryBinding(container, db);



  return container;
};

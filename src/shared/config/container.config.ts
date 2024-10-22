import { Container } from "inversify";

import { connectToDatabase } from "../../auth.module/infraestructure/database/Database";
import { Db } from "mongodb";
import orderBinding from "../bindings/order.binding";
import categoryBinding from "../bindings/category.binding";

const container = new Container();

// Función para inicializar las dependencias
export const initializeContainer = async (): Promise<Container> => {
  const db: Db = await connectToDatabase();

  // Registrar los bindings
  orderBinding(container, db);
  categoryBinding(container, db);

  return container;
};

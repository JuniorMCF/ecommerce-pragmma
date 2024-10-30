import { Container } from "inversify";
import { Database } from "../../database/mongo-database";
import { CartController } from "../../controllers/api/cart.controller";
import { ICartService } from "../../contracts/services/icart.service";
import { CartService } from "../../services/cart.service";
import { ICartRepository } from "../../contracts/repositories/icart.repository";
import { CartRepository } from "../../repositories/cart.repository";

const cartContainer = (container: Container): Container => {
  container.bind<ICartService>(CartService).toSelf();

  //const ioInstance = container.get(SocketIoServer);

  container
    .bind<ICartRepository>(CartRepository)
    .toConstantValue(new CartRepository(Database.getInstance().getDb()));

  container.bind<CartController>(CartController).toSelf();

  return container;
};

export default cartContainer;

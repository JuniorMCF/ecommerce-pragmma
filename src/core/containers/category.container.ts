import { Container } from "inversify";
import { CategoryController } from "../../app/categories/controllers/category.controller";
import { CategoryService } from "../../app/categories/services/category.service";
import { CategoryRepository } from "../../app/categories/repositories/category.repository";
import { ICategoryRepository } from "../../app/categories/contracts/repositories/icategory.repository";
import { ICategoryService } from "../../app/categories/contracts/services/icategory.service";
import { Database } from "../classes/mongo-database";
/* import { Server as SocketIoServer } from "socket.io";
 */

const categoryContainer = (container: Container): Container => {
  container.bind<ICategoryService>(CategoryService).toSelf();

  //const ioInstance = container.get(SocketIoServer);

  container
    .bind<ICategoryRepository>(CategoryRepository)
    .toConstantValue(new CategoryRepository(Database.getInstance().getDb()));



  container.bind<CategoryController>(CategoryController).toSelf();

  return container;
};

export default categoryContainer;

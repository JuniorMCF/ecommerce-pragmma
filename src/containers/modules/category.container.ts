import { Container } from "inversify";
import { CategoryController } from "../../controllers/api/category.controller";
import { CategoryService } from "../../services/category.service";
import { CategoryRepository } from "../../repositories/category.repository";
import { ICategoryRepository } from "../../contracts/repositories/icategory.repository";
import { ICategoryService } from "../../contracts/services/icategory.service";
import { Database } from "../../database/mongo-database";
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

import { Container } from "inversify";
import { Db } from "mongodb";
import { CategoryController } from "../../categoy.module/presentation/controllers/category.controller";
import { CreateCategoryCommand } from "../../categoy.module/application/commands/create-category.command";
import { GetCategoryByIdQuery } from "../../categoy.module/application/queries/get-category-by-id.query";
import { DeleteCategoryCommand } from "../../categoy.module/application/commands/delete-category.command";
import { ICategoryService } from "../../categoy.module/application/services/icategory.service";
import { CategoryService } from "../../categoy.module/infraestructure/services/category.service";

import { UpdateCategoryCommand } from "../../categoy.module/application/commands/update-cateogy.command";
import { ICategoryRepository } from "../../categoy.module/domain/repositories/icategory.repository";
import { MongoCategoryRepository } from "../../categoy.module/infraestructure/repositories/mongo-category.repository";


const categoryBinding = (container:Container,db:Db):Container=>{
    container.bind<CreateCategoryCommand>(CreateCategoryCommand).toSelf();
    container.bind<UpdateCategoryCommand>(UpdateCategoryCommand).toSelf();
    container.bind<GetCategoryByIdQuery>(GetCategoryByIdQuery).toSelf();
    container.bind<DeleteCategoryCommand>(DeleteCategoryCommand).toSelf();
    container.bind<CategoryService>(CategoryService).toSelf();
    
    container.bind<MongoCategoryRepository>(MongoCategoryRepository).toDynamicValue(() => new MongoCategoryRepository(db));
  
    // Registrar el controlador para que pueda resolver sus dependencias
    container.bind<CategoryController>(CategoryController).toSelf();

    return container
}

export default categoryBinding
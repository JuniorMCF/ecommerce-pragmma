import { Router} from 'express';
import { Container } from 'inversify';
import { CategoryController } from '../controllers/category.controller';

const categoryRoutes = (container:Container) =>{
    const router = Router()

    const categoryController = container.get<CategoryController>(CategoryController);

    router.post('/create', categoryController.createCategory.bind(categoryController));
    router.get('/:categoryId', categoryController.getCategory.bind(categoryController));
    router.put('/:categoryId/update', categoryController.updateCategory.bind(categoryController));
    router.delete('/:categoryId', categoryController.deleteCategory.bind(categoryController));
  
    return router;
}

export default categoryRoutes
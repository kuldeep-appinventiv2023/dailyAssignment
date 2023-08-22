import express from 'express';
import { authMiddleware } from '../middleware/jwtMiddleware';
import {
    addCategoryController,
    getAllCategoryController,
    getCategoryByIdController,
    getCategoryByNameController,
    getCategoryByCityNameController,
    updateCategoryByIdController,
    deleteCategoryByIdController
} from '../controller/categoryController';

const adminCategoryRouter = express.Router();

adminCategoryRouter.post('/addCategory', authMiddleware, addCategoryController);

adminCategoryRouter.get('/viewAllCategories', authMiddleware, getAllCategoryController);
adminCategoryRouter.get('/viewCategoryById/:id', authMiddleware, getCategoryByIdController);
adminCategoryRouter.get('/viewCategoryByName', authMiddleware, getCategoryByNameController);
adminCategoryRouter.get('/viewCategoryByCityName', authMiddleware, getCategoryByCityNameController);

adminCategoryRouter.patch('/updateCategory/:id', authMiddleware, updateCategoryByIdController);

adminCategoryRouter.delete('/deleteCategory/:id', authMiddleware, deleteCategoryByIdController);

export default adminCategoryRouter;

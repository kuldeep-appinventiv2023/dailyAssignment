import express from 'express';
import { authMiddleware } from '../middleware/jwtMiddleware';
import { addRestaurantController , 
         getAllResturantController, 
         getRestaurantByIdController,
         getRestaurantByNameController,
         getRestaurantByCityNameController, 
         updateRestaurantByIdController,
         deleteRestaurantByIdController } from '../controller/restaurantController';
const adminRestaurantRouter = express.Router();

adminRestaurantRouter.post('/addRestaurant', authMiddleware, addRestaurantController);

adminRestaurantRouter.get('/viewAllRestaurant', authMiddleware, getAllResturantController);
adminRestaurantRouter.get('/viewRestaurantById/:id', authMiddleware, getRestaurantByIdController);
adminRestaurantRouter.get('/viewRestaurantByName', authMiddleware, getRestaurantByNameController);
adminRestaurantRouter.get('/viewRestaurantByCityName', authMiddleware, getRestaurantByCityNameController);

adminRestaurantRouter.patch('/updateRestaurant/:id', authMiddleware, updateRestaurantByIdController);

adminRestaurantRouter.delete('/deleteRestaurant/:id', authMiddleware, deleteRestaurantByIdController);

export default adminRestaurantRouter;
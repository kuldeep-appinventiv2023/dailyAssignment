import express from 'express';
import { authMiddleware } from '../middleware/jwtMiddleware';
import { signupAdminController,
         loginAdminController,
         getAdminProfileController, 
         updateAdminProfileController, 
         deleteAdminProfileController, 
         forgetAdminPasswordController } from '../controller/adminController';

const adminRouter = express.Router();

adminRouter.post('/adminSignup', signupAdminController);
adminRouter.post('/adminLogin', loginAdminController);
adminRouter.post('/viewAdminProfile', authMiddleware, getAdminProfileController);
adminRouter.post('/updateAdminProfile', authMiddleware, updateAdminProfileController);
adminRouter.post('/deleteAdminProfile', authMiddleware, deleteAdminProfileController);
adminRouter.post('/forgetAdminPassword', authMiddleware, forgetAdminPasswordController);

export default adminRouter;

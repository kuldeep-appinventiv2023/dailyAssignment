import express from 'express';
import { authMiddleware } from '../middleware/jwtMiddleware';
import { verifyMail } from '../controller/verifyMailController';
import { signupCustomerController,
         loginCustomerController,
         getCustomerProfileController,
         updateCustomerProfileController,
         deleteCustomerProfileController,
         forgetCustomerPasswordController,
         customerLogoutController } from '../controller/customerController';
         
const customerRouter = express.Router();

customerRouter.post('/customerSignup', signupCustomerController);
customerRouter.post('/customerLogin', loginCustomerController);
customerRouter.post('/viewCustomerProfile', authMiddleware, getCustomerProfileController);
customerRouter.post('/updateCustomerProfile', authMiddleware, updateCustomerProfileController);
customerRouter.post('/deleteCustomerProfile', authMiddleware, deleteCustomerProfileController);
customerRouter.post('/forgetCustomerPassword', authMiddleware, forgetCustomerPasswordController);
customerRouter.post('/customerLogout', authMiddleware, customerLogoutController);

// customerRouter.post('/register', signupCustomerController);
customerRouter.get('/verify', verifyMail);

export default customerRouter;

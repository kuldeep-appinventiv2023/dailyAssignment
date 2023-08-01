import express from "express";
import { signup, login, getProfile, deleteUser, updateProfile, forgetPassword} from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/getProfile', getProfile);
userRouter.post('/deleteUser', deleteUser);
userRouter.post('/updateProfile', updateProfile);
userRouter.post('/forgetPassword', forgetPassword);

export default userRouter;
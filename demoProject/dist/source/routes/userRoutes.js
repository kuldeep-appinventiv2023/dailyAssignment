"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
userRouter.post('/signup', userController_1.signup);
userRouter.post('/login', userController_1.login);
userRouter.post('/getProfile', userController_1.getProfile);
userRouter.post('/deleteUser', userController_1.deleteUser);
userRouter.post('/updateProfile', userController_1.updateProfile);
userRouter.post('/forgetPassword', userController_1.forgetPassword);
exports.default = userRouter;

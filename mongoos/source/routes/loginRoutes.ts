import loginController from '../controllers/loginController';
import express from "express";

const router = express.Router();

router.post('/' ,loginController);

export default router;
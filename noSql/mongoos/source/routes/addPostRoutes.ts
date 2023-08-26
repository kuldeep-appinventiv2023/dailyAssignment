import  express  from "express";
import addPostController from '../controllers/addPostController';
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post('/',authMiddleware, addPostController);

export default router;
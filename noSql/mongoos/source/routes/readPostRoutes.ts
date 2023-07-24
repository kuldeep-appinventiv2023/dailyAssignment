import express from "express";
import readPostController from "../controllers/readPostController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// Define the route for fetching posts (GET request)
router.post('/',authMiddleware, readPostController);

export default router;

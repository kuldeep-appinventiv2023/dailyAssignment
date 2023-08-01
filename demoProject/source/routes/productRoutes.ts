import express from "express";
import { addProduct, getProduct, deleteProduct, updateProduct, bidding, addProductImage } from '../controllers/productController';
import multer from "../middleware/multerMiddleware";

const productRouter = express.Router();

productRouter.post('/addProduct', addProduct);

productRouter.post('/getProduct', getProduct);

productRouter.post('/updateProduct/:id', updateProduct);

productRouter.post('/deleteProduct', deleteProduct);

productRouter.post('/deleteProduct/:id', deleteProduct);

productRouter.post('/bidding', bidding);

productRouter.post('/addProductImage/:id', multer.upload.single('file'), addProductImage);


export default productRouter;
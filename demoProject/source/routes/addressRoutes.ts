import express from "express";
import { addAddress , updateAddress, deleteAddress} from "../controllers/addressController";

const addressRouter = express.Router();

addressRouter.post('/addAddress', addAddress);
addressRouter.post('/updateAddress/:id', updateAddress);
addressRouter.post('/deleteAddress/:id', deleteAddress);


export default addressRouter;
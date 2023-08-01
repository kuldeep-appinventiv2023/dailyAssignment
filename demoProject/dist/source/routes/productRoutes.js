"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const productRouter = express_1.default.Router();
productRouter.post('/addProduct', productController_1.addProduct);
productRouter.post('/getProduct', productController_1.getProduct);
productRouter.post('/updateProduct/:id', productController_1.updateProduct);
productRouter.post('/deleteProduct', productController_1.deleteProduct);
productRouter.post('/deleteProduct/:id', productController_1.deleteProduct);
productRouter.post('/bidding', productController_1.bidding);
exports.default = productRouter;

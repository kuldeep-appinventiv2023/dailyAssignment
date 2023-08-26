"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bidding = exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.addProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
//------------------------------------------ Add product API start------------------------------------------ //
function addProduct(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            console.log(token);
            if (!token) {
                return res.status(401).send("Authorization token not found");
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, "secret");
            const userId = decodedToken.userId;
            const { product_name, description, basePrice, title } = req.body;
            const product = yield productModel_1.default.create({
                product_name: product_name,
                description: description,
                basePrice: basePrice,
                title: title,
                userId,
            });
            console.log("Product added", product);
            return res.status(200).json({ result: "product added" });
        }
        catch (err) {
            console.error(err);
            return res.status(200).json({ result: "Please send proper detail" });
        }
    });
}
exports.addProduct = addProduct;
//------------------------------------------ Add product API end ------------------------------------------ //
//------------------------------------------ Get product API end ------------------------------------------ //
function getProduct(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            console.log(token);
            if (!token) {
                return res.status(401).send("Authorization token not found");
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, "secret");
            const userId = decodedToken.userId;
            const product = yield productModel_1.default.findAll({
                where: { userId: { [sequelize_1.Op.ne]: userId } },
            });
            console.log("Product added.........", product);
            return res.status(200).json({ product });
        }
        catch (err) {
            console.error(err);
            return res.status(200).json({ result: "wrong user id" });
        }
    });
}
exports.getProduct = getProduct;
//------------------------------------------ Get product API end ------------------------------------------ //
//------------------------------------------ Update product API start ------------------------------------------ //
function updateProduct(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            console.log(token);
            if (!token) {
                return res.status(401).send("Authorization token not found");
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, "secret");
            const userId = decodedToken.userId;
            const { product_name, description, basePrice, title } = req.body;
            yield productModel_1.default.update({
                product_name: product_name,
                description: description,
                basePrice: basePrice,
                title: title
            }, { where: { id: id } });
            return res.status(200).send("Product updated successfully......");
        }
        catch (err) {
            console.error(err);
            return res.status(400).send("Unable to update product");
        }
    });
}
exports.updateProduct = updateProduct;
//------------------------------------------ Update product API end ------------------------------------------ //
//------------------------------------------ Delete product API start ------------------------------------------ //
function deleteProduct(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            console.log(token);
            if (!token) {
                return res.status(401).send("Authorization token not found");
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, "secret");
            const userId = decodedToken.userId;
            yield productModel_1.default.destroy({
                where: { id: req.params.id },
            });
            res.send("Product delete");
        }
        catch (err) {
            console.error(err);
            return res.status(400).send("wrong user id");
        }
    });
}
exports.deleteProduct = deleteProduct;
//------------------------------------------ Delete product API end ------------------------------------------ //
//------------------------------------------ Bidding API start ------------------------------------------ //
function bidding(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.body.id;
            const { newBiddingPrice, userId } = req.body;
            const product = yield productModel_1.default.findOne({ where: { id } });
            if (product) {
                const product = yield productModel_1.default.findOne({ where: { id: id, userId: userId } });
                if (product) {
                    return res.status(400).send("You cannot bid on your own product");
                }
                else if (product.basePrice >= newBiddingPrice) {
                    return res.status(400).send("bidding prize should greater than basePrice");
                }
                const result = yield productModel_1.default.update({ newBiddingPrice: newBiddingPrice }, { where: { id: id } });
                return res.status(200).send("Bidding done");
            }
            else {
                return res.status(400).send("Worng user id");
            }
        }
        catch (err) {
            console.error(err);
            return res.status(200).json({ result: "wrong product id" });
        }
    });
}
exports.bidding = bidding;
//------------------------------------------ Bidding API end ------------------------------------------ //

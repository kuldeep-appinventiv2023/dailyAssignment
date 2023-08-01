"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./source/database/connection");
const userRoutes_1 = __importDefault(require("./source/routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./source/routes/productRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, connection_1.dbConnection)();
app.use("/api", userRoutes_1.default, productRoutes_1.default);
const PORT = 3500;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log("\n");
});

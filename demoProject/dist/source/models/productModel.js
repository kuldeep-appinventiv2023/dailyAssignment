"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const userModel_1 = __importDefault(require("./userModel"));
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        // allowNull:false,
    },
    product_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    productimages: {
        type: sequelize_1.DataTypes.BLOB,
        //allowNull: false,
    },
    biddingId: {
        type: sequelize_1.DataTypes.INTEGER,
        //allowNull: false,
    },
    basePrice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    newBiddingPrice: {
        type: sequelize_1.DataTypes.INTEGER,
        //allowNull: false,
    },
    bidderId: {
        type: sequelize_1.DataTypes.INTEGER,
        //allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: connection_1.sequelize,
    tableName: "product",
});
Product.belongsTo(userModel_1.default, { foreignKey: "id" });
Product.sync();
console.log("product table created !! \n \n ");
exports.default = Product;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const userModel_1 = __importDefault(require("./userModel"));
class Address extends sequelize_1.Model {
}
Address.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    houseNo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    streetNo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    area: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    landmark: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: false,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    pinCode: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel_1.default,
            key: 'id'
        }
    }
}, {
    sequelize: connection_1.sequelize,
    tableName: 'address',
});
userModel_1.default.hasMany(Address);
Address.belongsTo(userModel_1.default, { foreignKey: 'userId' });
Address.sync({ force: true });
console.log("adress table created !! \n \n ");
exports.default = Address;

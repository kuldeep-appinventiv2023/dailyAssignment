"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contactNumber: {
        type: sequelize_1.DataTypes.INTEGER,
        // allowNull: false,
        unique: true
    },
    DOB: {
        type: sequelize_1.DataTypes.DATE,
        // allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        // allowNull: false,
    },
    profilePicture: {
        type: sequelize_1.DataTypes.BLOB,
        // allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        // allowNull: false,
    },
    dreamCompany: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: connection_1.sequelize,
    tableName: 'users',
});
User.sync();
console.log("user table created !! \n \n ");
exports.default = User;

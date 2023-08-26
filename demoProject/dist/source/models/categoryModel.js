"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Categories extends sequelize_1.Model {
}
Categories.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    subcategories: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    // categoriesImage: {
    //     type: DataTypes.BLOB,
    //     //allowNull: false,
    // }
}, {
    sequelize: connection_1.sequelize,
    tableName: 'categories',
});
Categories.sync({ force: true });
console.log("The table for the Categories model was just (re)created!\n\n");
exports.default = Categories;

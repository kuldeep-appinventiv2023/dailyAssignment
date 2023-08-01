import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/connection";
import User from "./userModel";

class Product extends Model {
  id!: number;
  userId!: number;
  product_name!: string;
  description!: string;
  productimages!: Blob;
  biddingId!:number;
  basePrice!: number;
  newBiddingPrice!:number;
  bidderId!:number;
  title!: string;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      // allowNull:false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productimages: {
      type: DataTypes.BLOB,
      //allowNull: false,
    },
    biddingId: {
      type: DataTypes.INTEGER,
      //allowNull: false,
    },
    basePrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    newBiddingPrice: {
      type: DataTypes.INTEGER,
      //allowNull: false,
    },
    bidderId: {
      type: DataTypes.INTEGER,
      //allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "product",
  }
);

Product.belongsTo(User, { foreignKey: "id" });

Product.sync();
console.log("product table created !! \n \n ");
export default Product;

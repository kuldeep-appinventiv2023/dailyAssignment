import { Model, DataTypes } from 'sequelize';
import {sequelize}  from '../database/connection';

class User extends Model {
    id!: number;

    username!: string;
    email!: string;
    password!: string;
    contactNumber!: number;
    DOB!: Date;
    gender!: string;
    profilePicture! : Blob;
    status!: boolean;
    dreamCompany!:string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    contactNumber: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        unique:true
    },
    DOB: {
        type: DataTypes.DATE,
        // allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    profilePicture: {
        type: DataTypes.BLOB,
        // allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        // allowNull: false,
    },
    dreamCompany: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

User.sync();
console.log("user table created !! \n \n ");
export default User;
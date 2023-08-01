import { Model, DataTypes } from 'sequelize';
import {sequelize}  from '../database/connection';

class Session extends Model {
   id!: number;
   userId!: number;
   deviceId!: string;
   deviceType!: string;
   isActive!: boolean;
}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deviceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deviceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'session',
  },
);
Session.sync({force:true});
console.log("session table created !! \n \n ");
export default Session;



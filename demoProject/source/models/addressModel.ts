import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import User from './userModel';

class Address extends Model {
   id!: number;
   houseNo!: string;
   streetNo!: number;
   area!: string;
   landmark!: string;
   city!: string;
   state!: string;
   country!: string;
   pinCode!: number;
   userId!: number;
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    houseNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landmark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pinCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
            model: User,
            key: 'id'
        }
    }
  },
  {
    sequelize,
    tableName: 'address',
  },
);
User.hasMany(Address);
Address.belongsTo(User, {foreignKey: 'userId'})
Address.sync();
console.log("adress table created !! \n \n ");
export default Address;
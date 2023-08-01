import { Model, DataTypes } from 'sequelize';
import { sequelize }  from '../database/connection';

class Categories extends Model {
    id!: number;
    category_name!: string;
    subcategories!: string;
    categoriesImage!: Blob;    
}

Categories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subcategories: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoriesImage: {
        type: DataTypes.BLOB,
        //allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'categories',
  }
);
Categories.sync({force:true});
console.log("The table for the Categories model was just (re)created!\n\n");
export default Categories;

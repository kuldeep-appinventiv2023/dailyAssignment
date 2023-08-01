import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('demoProject', 'postgres', 'kuldeep@321', {
    host: 'localhost',
    dialect: 'postgres'
});

async function dbConnection (){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.\n');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

export {sequelize, dbConnection};
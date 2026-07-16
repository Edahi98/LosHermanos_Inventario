
import { Sequelize } from 'sequelize';
import * as config from './config.ts';
import console from "node:console";

const sequelize = new Sequelize(
  config.config.database!,
  config.config.username!,
  config.config.password,
  {
    host: config.config.host,
    port: config.config.port,
    dialect: config.config.dialect,
    dialectOptions: config.config.dialectOptions,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;

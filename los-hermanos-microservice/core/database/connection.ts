
import { Sequelize } from 'sequelize';
import * as config from './config.ts';
import process from 'node:process';


const env = process.env.DENO_ENV || 'development';
const dbConfig = config[env as keyof typeof config];

const sequelize = new Sequelize(
  dbConfig.database!,
  dbConfig.username!,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
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

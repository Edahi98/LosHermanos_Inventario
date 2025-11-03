
import { Dialect } from 'sequelize';
import process from 'node:process';

export const development = {
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'loshermanos_dev',
  host: process.env.DB_HOST || 'localhost',
  dialect: (process.env.DB_DIALECT || 'postgres') as Dialect,
};

export const test = {
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'loshermanos_test',
  host: process.env.DB_HOST || 'localhost',
  dialect: (process.env.DB_DIALECT || 'postgres') as Dialect,
};

export const production = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: (process.env.DB_DIALECT || 'postgres') as Dialect,
};

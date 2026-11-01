import 'dotenv/config';
import { Sequelize } from 'sequelize';

const database = process.env.POSTGRES_DB;
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

if (!database || !username || !password) {
  throw new Error('unverfügbare daten .env');
}

export const sequelize = new Sequelize(
  database,
  username,
  password,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST ,
    port: Number(process.env.DB_PORT),
    logging: false,
  }
);
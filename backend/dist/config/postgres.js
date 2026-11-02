"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
require("dotenv/config");
const sequelize_1 = require("sequelize");
const database = process.env.POSTGRES_DB;
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
if (!database || !username || !password) {
    throw new Error('unverfügbare daten .env');
}
exports.sequelize = new sequelize_1.Sequelize(database, username, password, {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    logging: false,
});

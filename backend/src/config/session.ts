import 'dotenv/config';
import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';
import { sequelize } from './postgres';

const secret = process.env.SESSION_SECRET;

if (!secret) {
    throw new Error('SESSION_SECRET fehlt.');
}

const SequelizeStore = connectSessionSequelize(session.Store);

export const sessionStore = new SequelizeStore({
    db: sequelize
});

export const sessionMiddleware = session({
    name: 'lager.sid',
    secret,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000
    }
});
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const postgres_1 = require("./config/postgres");
async function startServer() {
    try {
        await postgres_1.sequelize.authenticate();
        console.log('Verbindung zu PostgreSQL erfolgreich');
        const port = Number(process.env.PORT);
        app_1.default.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error('starten fehlgeschlagen', error);
        await postgres_1.sequelize.close();
        process.exitCode = 1;
    }
}
void startServer();

import app from './app';
import { sequelize } from './config/postgres';
import "./models/produkt.model";

async function startServer(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Verbindung zu PostgreSQL erfolgreich');

    const port = Number(process.env.PORT);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('starten fehlgeschlagen', error);
    await sequelize.close();
    process.exitCode = 1;
  }
  await sequelize.sync();
}

void startServer();
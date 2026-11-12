import app from './app';
import { sequelize } from './config/postgres';
import { sessionStore } from './config/session';
import { Benutzer } from './models/benutzer.model';
import { Produkt } from './models/produkt.model';
import { Warenbewegung } from './models/warenbewegung.model';

async function startServer(): Promise<void> {
  try {
    await sequelize.authenticate();
    await Benutzer.sync();
    await Produkt.sync();
    await Warenbewegung.sync();
    await sessionStore.sync();
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
}

void startServer();
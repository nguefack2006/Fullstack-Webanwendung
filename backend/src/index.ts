import app from './app';
import { sequelize } from './config/postgres';
import { connectMongoDB } from "./config/mongodb";
import "./models/produkt.model";
import { sessionStore } from './config/session';
import { Benutzer } from './models/benutzer.model';
import { Produkt } from './models/produkt.model';
import { Warenbewegung } from './models/warenbewegung.model';
import "./events/journal.listener";

async function startServer(): Promise<void> {
  try {
    await sequelize.authenticate();
    await Benutzer.sync();
    await Produkt.sync();
    await Warenbewegung.sync();
    await sessionStore.sync();
    console.log('Verbindung zu PostgreSQL erfolgreich');
    await sequelize.sync();
    await connectMongoDB();
    const port = Number(process.env.PORT);

    await connectMongoDB();

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
import { eventBus } from "./event.bus";
import { saveEvent } from "../services/journal.service";

eventBus.on("WarenbewegungErfasst", async (daten) => {
    try {
        await saveEvent(daten);
    } catch (error) {
        console.error(error);
    }
});

eventBus.on("BenutzerAngemeldet", async (daten) => {
    try {
        await saveEvent(daten);
        console.log("Anmeldung gespeichert");
    } catch (error) {
        console.error(error);
    }
});
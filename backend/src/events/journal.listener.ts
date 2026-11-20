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

eventBus.on("BenutzerAbgemeldet",async (daten) => {
    try{
        await saveEvent(daten);
        console.log("Benutzer abgemeldet");
    } catch(error) {
        console.error(error);
    }
});

eventBus.on("Verwalterregistriert",async (daten) => {
    try{
        await saveEvent(daten);
        console.log("Largerverwalter erstellt");
    } catch(error) {
        console.error(error);
    }
});

eventBus.on("Assistentregistriert",async (daten) => {
    try{
        await saveEvent(daten);
        console.log("Largerassistent erstellt");
    } catch(error) {
        console.error(error);
    }
});

eventBus.on("Produktangelegt",async (daten) => {
    try{
        await saveEvent(daten);
        console.log("Neues Produk angelegt");
    } catch(error) {
        console.error(error);
    }
});

eventBus.on("Produktdelete",async (daten) => {
    try{
        await saveEvent(daten);
        console.log("Produkt gelöscht");
    } catch(error) {
        console.error(error);
    }
});
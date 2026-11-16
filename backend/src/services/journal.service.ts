import { eventcall, Journal } from "../models/journal.model";

export async function getAllEvents() {
    return eventcall();
}

export async function saveEvent(daten: {
    eventTyp: string;
    produktId: number;
    benutzerId: number;
    menge: number;
}) {
    return Journal.create(daten);
}
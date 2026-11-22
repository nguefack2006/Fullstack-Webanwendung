import { eventcall, Journal } from "../models/journal.model";

export async function getAllEvents() {
    return eventcall();
}

export async function saveEvent(daten: {
    eventTyp: string;
    produktId?: number;
    benutzerId?: number;
    benutzerNachname?: string;
    menge?: number;
    alteMenge?: number;
    neueMenge?: number;
}) {
    return Journal.create(daten);
}
import { Request, Response } from "express";
import { getAllEvents } from "../services/journal.service";

export async function getJournal(
    req: Request,
    res: Response
) {
    try {
        const events = await getAllEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({
            message: "Fehler beim Laden des Journals"
        });
    }
}
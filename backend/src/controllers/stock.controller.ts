import { wareneingangBuchen,warenausgangBuchen } from "../services/stock.service";
import { Request, Response } from 'express';

export async function buchenWareneingang(req: Request, res: Response) {
    try {
        const { produktId, benutzerId, menge } = req.body;

        const warenbewegung = await wareneingangBuchen(produktId, benutzerId, menge);

        res.status(201).json(warenbewegung);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                error: error.message
            });
        }
        return res.status(500).json({ error: 'Fehler beim Buchen des Wareneingangs' });
    }
}

export async function buchenWarenausgang(req: Request, res: Response) {
    try {
        const { produktId, benutzerId, menge } = req.body;

        const warenbewegung = await warenausgangBuchen(produktId, benutzerId, menge);

        res.status(201).json(warenbewegung);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                error: error.message
            });
        }
        return res.status(500).json({ error: 'Fehler beim Buchen des Warenausgangs' });
    }
}

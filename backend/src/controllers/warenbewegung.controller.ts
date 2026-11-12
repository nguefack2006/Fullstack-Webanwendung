import { getProduktBewegungen} from "../services/warenbewegung.service";
import { Request, Response } from 'express';

export async function getProduktBewegungenById(
    req: Request,
    res: Response
) {
    try {
        const produktId = Number(req.params.id);
        const bewegungen = await getProduktBewegungen(produktId);
        res.status(200).json(bewegungen);
    } catch (error) {
        console.error('Fehler beim Abrufen der Produktbewegungen:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Produktbewegungen' });
    }
}
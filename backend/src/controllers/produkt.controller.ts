import { alleProdukte, produktById, searchProdukteByName } from "../services/produkt.service";
import { Request, Response } from 'express';

export async function getAllProdukte(req: Request, res: Response) {
    try {
        const produkte = await alleProdukte();


        res.status(200).json(produkte);
    } catch (error) {
        console.error('Fehler beim Abrufen der Produkte:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Produkte' });
    }
}

export async function getProduktById(req: Request, res: Response) {
    try {
        const produktId = Number(req.params.id);
        const produkt = await produktById(produktId);

        if (!produkt) {
            res.status(404).json({ error: 'Produkt nicht gefunden' });
            return;
        }

        res.status(200).json(produkt);
    } catch (error) {
        console.error('Fehler beim Abrufen des Produkts:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen des Produkts' });
    }
}

export async function suchProdukteByName(req: Request, res: Response) {
    try {
        const name = req.query.name as string;
        const produkte = await searchProdukteByName(name);
        if (!produkte || produkte.length === 0) {
            res.status(400).json({ error: 'Ungültiger Suchbegriff' });
            return;
        }
        res.status(200).json(produkte);
    } catch (error) {
        console.error('Fehler beim Suchen der Produkte:', error);
        res.status(500).json({ error: 'Fehler beim Suchen der Produkte' });
    }
}



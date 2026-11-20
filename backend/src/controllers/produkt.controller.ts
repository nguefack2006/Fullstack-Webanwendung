import { Trim } from './../../node_modules/@sinclair/typebox/build/cjs/type/helpers/helpers.d';
import { alleProdukte, produktById, searchProdukteByName } from "../services/produkt.service";
import type { Request, Response } from 'express';
import { UniqueConstraintError } from 'sequelize';
import { createProdukt, updateProdukt, deleteProdukt } from '../models/produkt.model';
import { eventBus } from "../events/event.bus";

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

        console.log("[PRODUKT] Suche nach ID:", produktId);

        const produkt = await produktById(produktId);


        if (!produkt) {

            console.warn("[PRODUKT] Nicht gefunden:", produktId);

            res.status(404).json({ error: 'Produkt nicht gefunden' });
            return;
        }

        console.log("[PRODUKT] Gefunden:", produktId);

        res.status(200).json(produkt);
    } catch (error) {
        console.error("[PRODUKT] Suchfehler:", error);
        console.error('Fehler beim Abrufen des Produkts:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen des Produkts' });
    }
}

export async function suchProdukteByName(req: Request, res: Response) {
    try {
        const name = req.query.name as string;

        console.log("[PRODUKT] Suche nach Name:", name);

        const produkte = await searchProdukteByName(name);
        if (!produkte || produkte.length === 0) {
            console.warn("[PRODUKT] Ungültiger Suchbegriff");
            res.status(400).json({ error: 'Ungültiger Suchbegriff' });
            return;
        }
        res.status(200).json(produkte);
    } catch (error) {
        console.error('Fehler beim Suchen der Produkte:', error);
        res.status(500).json({ error: 'Fehler beim Suchen der Produkte' });
    }
}


export async function handleCreateProdukt(req: Request, res: Response): Promise<void> {
    const benutzer = res.locals.benutzer;

    if (!benutzer) {
        res.status(401).json({ message: 'Bitte anmelden.' });
        return;
    }

    if (benutzer.benutzerRolle !== 'LAGERVERWALTER') {
        res.status(403).json({ message: 'Keine Berechtigung.' });
        return;
    }

    const {  produktName, produktBeschreibung } = req.body ?? {};

    if (
        typeof produktName !== 'string' || !produktName.trim() ||
        typeof produktBeschreibung !== 'string' || !produktBeschreibung.trim()
    ) {
        res.status(400).json({ message: 'Ungültige Produktdaten.' });
        return;
    }

    try {
        const produkt = await createProdukt({
            produktName: produktName.trim(),
            produktBeschreibung: produktBeschreibung.trim(),
            erstelltVon: benutzer.benutzerId
        });

        eventBus.emit("Produktangelegt", {
            eventTyp: "PRODUKT_ANGELEGT",
            produktId: produkt.get("produktId"),
        });

        res.status(201).json(produkt);
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({ message: 'Diese Produkt-ID ist bereits vergeben.' });
            return;
        }

        throw error;
    }
}

export async function handleUpdateProdukt(
    req: Request,
    res: Response
): Promise<void> {
    const benutzer = res.locals.benutzer;

    if (!benutzer) {
        res.status(401).json({ message: 'Bitte anmelden.' });
        return;
    }

    if (benutzer.benutzerRolle !== 'LAGERVERWALTER') {
        res.status(403).json({ message: 'Keine Berechtigung.' });
        return;
    }

    const produktId = Number(req.params.id);

    if (
        !Number.isInteger(produktId) ||
        produktId < 1 ||
        produktId > 2147483647
    ) {
        res.status(400).json({ message: 'Ungültige Produkt-ID.' });
        return;
    }

    const { produktName, produktBeschreibung, produktMenge} = req.body ?? {};

    if (produktName === undefined && produktBeschreibung === undefined && produktMenge === undefined) {
        res.status(400).json({
            message: 'Bitte Name, Beschreibung oder Menge angeben.'
        });
        return;
    }

    if (
        produktName !== undefined &&
        (typeof produktName !== 'string' || !produktName.trim())
    ) {
        res.status(400).json({ message: 'Ungültiger Produktname.' });
        return;
    }

    if (
        produktBeschreibung !== undefined &&
        (typeof produktBeschreibung !== 'string' ||
            !produktBeschreibung.trim())
    ) {
        res.status(400).json({ message: 'Ungültige Beschreibung.' });
        return;
    }
    if(produktMenge !== undefined && 
        (typeof produktMenge !== 'number'|| 
            produktMenge <0)
        
    ){ 
        res.status(400).json({message: 'Ungültige Menge.'});
        return
    }

    const daten: {
        produktName?: string;
        produktBeschreibung?: string;
        produktMenge?:number;
    } = {};

    if (produktName !== undefined) {
        daten.produktName = produktName.trim();
    }

    if (produktBeschreibung !== undefined) {
        daten.produktBeschreibung = produktBeschreibung.trim();
    }

    if (produktMenge !==undefined){
        daten.produktMenge = produktMenge
    }

    const [anzahl] = await updateProdukt(produktId, daten);

    if (anzahl === 0) {
        res.status(404).json({ message: 'Produkt nicht gefunden.' });
        return;
    }

    res.status(200).json({ message: 'Produkt erfolgreich aktualisiert.' });
}

export async function handleDeleteProdukt(
    req: Request,
    res: Response
): Promise<void> {
    const benutzer = res.locals.benutzer;

    if (!benutzer) {
        res.status(401).json({ message: 'Bitte anmelden.' });
        return;
    }

    if (benutzer.benutzerRolle !== 'LAGERVERWALTER') {
        res.status(403).json({ message: 'Keine Berechtigung.' });
        return;
    }

    const produktId = Number(req.params.id);

    if (
        !Number.isInteger(produktId) ||
        produktId < 1 ||
        produktId > 2147483647
    ) {
        res.status(400).json({ message: 'Ungültige Produkt-ID.' });
        return;
    }

    const anzahlifgelöscht = await deleteProdukt(produktId);

    if (anzahlifgelöscht === 0) {
        res.status(404).json({ message: 'Produkt nicht gefunden.' });
        return;
    }
    eventBus.emit("Produktdelete", {
            eventTyp: "PRODUKT_DELETE",
            produktId,
        });

    res.status(204).send();
}

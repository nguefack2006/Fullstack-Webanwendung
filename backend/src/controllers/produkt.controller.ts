import type { Request, Response } from 'express';
import { UniqueConstraintError } from 'sequelize';
import { createProdukt , updateProdukt ,  deleteProdukt } from '../models/produkt.model';

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

    const { produktId, produktName, produktBeschreibung } = req.body ?? {};

    if (
        !Number.isInteger(produktId) || produktId < 1 || produktId > 2147483647 ||
        typeof produktName !== 'string' || !produktName.trim() ||
        typeof produktBeschreibung !== 'string' || !produktBeschreibung.trim()
    ) {
        res.status(400).json({ message: 'Ungültige Produktdaten.' });
        return;
    }

    try {
        const produkt = await createProdukt({
            produktId,
            produktName: produktName.trim(),
            produktBeschreibung: produktBeschreibung.trim(),
            erstelltVon: benutzer.benutzerId
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

    const { produktName, produktBeschreibung } = req.body ?? {};

    if (produktName === undefined && produktBeschreibung === undefined) {
        res.status(400).json({
            message: 'Bitte Name oder Beschreibung angeben.'
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

    const daten: {
        produktName?: string;
        produktBeschreibung?: string;
    } = {};

    if (produktName !== undefined) {
        daten.produktName = produktName.trim();
    }

    if (produktBeschreibung !== undefined) {
        daten.produktBeschreibung = produktBeschreibung.trim();
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

    res.status(204).send();
}
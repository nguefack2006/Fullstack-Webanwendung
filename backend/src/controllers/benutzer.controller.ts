import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { getBenutzerByEmail } from '../models/benutzer.model';
import { erstelleBenutzerKonto } from '../services/benutzer.service';
import { UniqueConstraintError } from 'sequelize';

export async function handleLogin(
    req: Request,
    res: Response
): Promise<void> {
    const { benutzerEmail, benutzerPasswort } = req.body ?? {};

    if (
        typeof benutzerEmail !== 'string' ||
        !benutzerEmail.trim() ||
        typeof benutzerPasswort !== 'string' ||
        !benutzerPasswort
    ) {
        res.status(400).json({
            message: 'Bitte E-Mail-Adresse und Passwort eingeben.'
        });
        return;
    }

    const benutzer = await getBenutzerByEmail(benutzerEmail.trim());

    if (!benutzer) {
        res.status(401).json({
            message: 'Ungültige Anmeldedaten.'
        });
        return;
    }

    const passwortHash = benutzer.get('benutzerPasswortHash');

    if (typeof passwortHash !== 'string') {
        throw new Error('Passwort-Hash des Benutzers fehlt.');
    }

    const passwortIstGueltig = await bcrypt.compare(
        benutzerPasswort,
        passwortHash
    );

    if (!passwortIstGueltig) {
        res.status(401).json({
            message: 'Ungültige Anmeldedaten.'
        });
        return;
    }

   const benutzerId = benutzer.get('benutzerId');

    if (typeof benutzerId !== 'number') {
        throw new Error('Ungültige Benutzer-ID.');
    }

    await new Promise<void>((resolve, reject) => {
        req.session.regenerate((error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });

    req.session.benutzerId = benutzerId;

    await new Promise<void>((resolve, reject) => {
        req.session.save((error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });

    res.status(200).json({
        message: 'Erfolgreich angemeldet.',
        benutzer: {
            benutzerId,
            benutzerVorname: benutzer.get('benutzerVorname'),
            benutzerNachname: benutzer.get('benutzerNachname'),
            benutzerEmail: benutzer.get('benutzerEmail'),
            benutzerRolle: benutzer.get('benutzerRolle')
        }
    });
}

export function handleLogout(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    req.session.destroy((error) => {
        if (error) {
            next(error);
            return;
        }

        res.clearCookie('lager.sid', {
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });

        res.status(200).json({
            message: 'Erfolgreich abgemeldet.'
        });
    });
}

export async function handleRegisterLagerverwalter(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const {
        benutzerId,
        benutzerVorname,
        benutzerNachname,
        benutzerEmail,
        benutzerPasswort
    } = req.body ?? {};

    if (
        !Number.isInteger(benutzerId) ||
        benutzerId < 1 ||
        benutzerId > 2147483647
    ) {
        res.status(400).json({
            message: 'Ungültige Benutzer-ID.'
        });
        return;
    }

    const texte = [
        benutzerVorname,
        benutzerNachname,
        benutzerEmail
    ];

    if (
        texte.some(
            text => typeof text !== 'string' ||
                !text.trim() ||
                text.trim().length > 255
        )
    ) {
        res.status(400).json({
            message: 'Bitte Vorname, Nachname und E-Mail-Adresse angeben.'
        });
        return;
    }

    if (
        typeof benutzerPasswort !== 'string' ||
        !benutzerPasswort.trim() ||
        Buffer.byteLength(benutzerPasswort, 'utf8') > 72
    ) {
        res.status(400).json({
            message: 'Ungültiges Passwort.'
        });
        return;
    }

    try {

        const neueBenutzerId = await erstelleBenutzerKonto({
            benutzerId,
            benutzerVorname,
            benutzerNachname,
            benutzerEmail,
            benutzerPasswort
        }, 'LAGERVERWALTER');

        res.status(201).json({
            message: 'Konto erfolgreich erstellt.',
            benutzerId: neueBenutzerId
        });
        
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Benutzer-ID oder E-Mail-Adresse bereits vergeben.'
            });
            return;
        }

        next(error);
    }
}

export async function handleCreateLagerassistent(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const benutzer = res.locals.benutzer;

    if (!benutzer) {
        res.status(401).json({
            message: 'Bitte anmelden.'
        });
        return;
    }

    if (benutzer.benutzerRolle !== 'LAGERVERWALTER') {
        res.status(403).json({
            message: 'Keine Berechtigung.'
        });
        return;
    }

    const {
        benutzerId,
        benutzerVorname,
        benutzerNachname,
        benutzerEmail,
        benutzerPasswort
    } = req.body ?? {};

    if (
        !Number.isInteger(benutzerId) ||
        benutzerId < 1 ||
        benutzerId > 2147483647
    ) {
        res.status(400).json({
            message: 'Ungültige Benutzer-ID.'
        });
        return;
    }

    const texte = [
        benutzerVorname,
        benutzerNachname,
        benutzerEmail
    ];

    if (
        texte.some(
            text => typeof text !== 'string' ||
                !text.trim() ||
                text.trim().length > 255
        )
    ) {
        res.status(400).json({
            message: 'Bitte Vorname, Nachname und E-Mail-Adresse angeben.'
        });
        return;
    }

    if (
        typeof benutzerPasswort !== 'string' ||
        !benutzerPasswort.trim() ||
        Buffer.byteLength(benutzerPasswort, 'utf8') > 72
    ) {
        res.status(400).json({
            message: 'Ungültiges Passwort.'
        });
        return;
    }

    try {
        const neueBenutzerId = await erstelleBenutzerKonto({
            benutzerId,
            benutzerVorname,
            benutzerNachname,
            benutzerEmail,
            benutzerPasswort
        }, 'LAGERASSISTENT');

        res.status(201).json({
            message: 'Lagerassistent erfolgreich erstellt.',
            benutzerId: neueBenutzerId
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Benutzer-ID oder E-Mail-Adresse bereits vergeben.'
            });
            return;
        }

        next(error);
    }
}
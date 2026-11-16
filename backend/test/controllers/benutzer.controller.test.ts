import { describe, expect, it, jest } from '@jest/globals';
import type { Request, Response } from 'express';

const getBenutzerByEmail = jest.fn<(email: string) => Promise<unknown>>();
const compare = jest.fn<(passwort: string, hash: string) => Promise<boolean>>();

jest.doMock('../../src/models/benutzer.model', () => ({
    getBenutzerByEmail
}));

jest.doMock('bcrypt', () => ({
    __esModule: true,
    default: { compare }
}));

const { handleLogin } =
    require('../../src/controllers/benutzer.controller') as
        typeof import('../../src/controllers/benutzer.controller');

describe('BenutzerController', () => {
    it('meldet den Benutzer an und speichert seine ID in der Sitzung', async () => {
        const profil = {
            benutzerId: 1,
            benutzerVorname: 'Test',
            benutzerNachname: 'Verwalter',
            benutzerEmail: 'test@example.test',
            benutzerRolle: 'LAGERVERWALTER'
        };

        const konto: Record<string, unknown> = {
            ...profil,
            benutzerPasswortHash: 'simulierter-hash'
        };

        getBenutzerByEmail.mockResolvedValue({
            get: (feld: string) => konto[feld]
        });
        compare.mockResolvedValue(true);

        const session = {
            benutzerId: undefined as number | undefined,
            regenerate: jest.fn((fertig: () => void) => {
                session.benutzerId = undefined;
                fertig();
            }),
            save: jest.fn((fertig: () => void) => {
                expect(session.benutzerId).toBe(1);
                fertig();
            })
        };

        const request = {
            body: {
                benutzerEmail: profil.benutzerEmail,
                benutzerPasswort: 'test-passwort'
            },
            session
        };

        const response = {
            status: jest.fn(),
            json: jest.fn()
        };
        response.status.mockReturnValue(response);

        await handleLogin(
            request as unknown as Request,
            response as unknown as Response
        );

        expect(getBenutzerByEmail).toHaveBeenCalledWith(profil.benutzerEmail);
        expect(compare).toHaveBeenCalledWith('test-passwort', 'simulierter-hash');
        expect(session.regenerate).toHaveBeenCalledTimes(1);
        expect(session.save).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({
            message: 'Erfolgreich angemeldet.',
            benutzer: profil
        });
    });
});
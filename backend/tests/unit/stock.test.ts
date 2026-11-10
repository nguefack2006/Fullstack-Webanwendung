import { expect, jest, it, beforeEach, describe } from '@jest/globals'
import { Request, Response } from 'express'
import { buchenWareneingang, buchenWarenausgang } from '../../src/controllers/stock.controller'
import { wareneingangBuchen, warenausgangBuchen } from '../../src/services/stock.service'

jest.mock("../../src/services/stock.service", () => ({
    warenausgangBuchen: jest.fn(),
    wareneingangBuchen: jest.fn()
}));

describe("stock.controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should book an outgoing stock movement successfully", async () => {

        const expectedResult =
        {
            produktId: 1,
            benutzerId: 2,
            bewegungTyp: "AUSGANG",
            menge: 10,
            bewegungsDatum: "2026-11-08"
        }
            ;

        jest.mocked(warenausgangBuchen)
            .mockResolvedValue(expectedResult as any);

        const req = {
            body: {
                produktId: 1,
                benutzerId: 2,
                menge: 10
            }
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await buchenWarenausgang(req, res);

        expect(warenausgangBuchen).toHaveBeenCalledWith(1, 2, 10);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expectedResult);
    });
    it("should return 400 if outgoing stock booking fails", async () => {

        jest.mocked(warenausgangBuchen)
            .mockRejectedValue(new Error("Nicht genügend Lagerbestand"));

        const req = {
            body: {
                produktId: 1,
                benutzerId: 2,
                menge: 100
            }
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await buchenWarenausgang(req, res);

        expect(warenausgangBuchen).toHaveBeenCalledWith(1, 2, 100);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith({
            error: "Nicht genügend Lagerbestand"
        });

    });
    it("should return 500 if an unexpected error occurs during outgoing stock booking", async () => {
        jest.mocked(warenausgangBuchen)
            .mockRejectedValue([]);
        const req = {
            body: {
                produktId: 1,
                benutzerId: 2,
                menge: 100
            }
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await buchenWarenausgang(req, res);

        expect(warenausgangBuchen).toHaveBeenCalledWith(1, 2, 100);

        expect(res.status).toHaveBeenCalledWith(500);

        expect(res.json).toHaveBeenCalledWith({
            error: "Fehler beim Buchen des Warenausgangs"
        });

    });
});

describe("Wareneingang", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should book an incoming stock movement successfully", async () => {

        const expectedResult = {
            produktId: 1,
            benutzerId: 2,
            bewegungTyp: "EINGANG",
            menge: 10,
            bewegungsDatum: "2026-11-08"
        };

        jest.mocked(wareneingangBuchen)
            .mockResolvedValue(expectedResult as any);

        const req = {
            body: {
                produktId: 1,
                benutzerId: 2,
                menge: 10
            }
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await buchenWareneingang(req, res);

        expect(wareneingangBuchen).toHaveBeenCalledWith(1, 2, 10);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expectedResult);
    });

    it("should return 400 if incoming stock booking fails", async () => {

        jest.mocked(wareneingangBuchen)
            .mockRejectedValue(new Error("Ungültige Menge"));

        const req = {
            body: {
                produktId: 1,
                benutzerId: 2,
                menge: -10
            }
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await buchenWareneingang(req, res);

        expect(wareneingangBuchen).toHaveBeenCalledWith(1, 2, -10);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith({
            error: "Ungültige Menge"
        });
    });

    it("should return 500 if an unexpected error occurs during incoming stock booking", async () => {

        jest.mocked(wareneingangBuchen)
            .mockRejectedValue([]);

        const req = {
            body: {
                produktId: 1,
                benutzerId: 2,
                menge: 10
            }
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await buchenWareneingang(req, res);

        expect(wareneingangBuchen).toHaveBeenCalledWith(1, 2, 10);

        expect(res.status).toHaveBeenCalledWith(500);

        expect(res.json).toHaveBeenCalledWith({
            error: "Fehler beim Buchen des Wareneingangs"
        });
    });
});

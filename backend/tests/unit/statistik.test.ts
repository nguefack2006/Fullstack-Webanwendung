import { expect, jest, describe, it, beforeEach } from "@jest/globals";
import { Request, Response } from "express";
import { getTaeglichenWarenausgang } from "../../src/controllers/statistik.controller";
import { getStatistik } from "../../src/services/statistik.service";

jest.mock("../../src/services/statistik.service", () => ({
    getStatistik: jest.fn()
}));

describe("Statistik", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should get daily statistics for a product", async () => {

        const expectedResult = [
            { bewegungsDatum: "2026-11-08", produktMenge: 10 },
            { bewegungsDatum: "2026-11-09", produktMenge: 15 }
        ];

        jest.mocked(getStatistik)
            .mockResolvedValue(expectedResult as any);

        const req = {
            params: { id: "1" },
            query: { groupBy: "day" }
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await getTaeglichenWarenausgang(req, res);

        expect(getStatistik).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedResult);
    });

    it("should handle if(isInteger) no correct product id is provided", async () => {
        jest.mocked(getStatistik)
            .mockResolvedValue([]);
        const req = {
            params: { id: "jeans" },
            query: { groupBy: "day" }
        } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await getTaeglichenWarenausgang(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Ungültige Produkt-ID" });
        expect(getStatistik).not.toHaveBeenCalled();
    });


    it("should handle if no correct product id is provided", async () => {
        jest.mocked(getStatistik)
            .mockResolvedValue([]);
        const req = {
            params: { id: "-1" },
            query: { groupBy: "day" }
        } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await getTaeglichenWarenausgang(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Ungültige Produkt-ID" });
        expect(getStatistik).not.toHaveBeenCalled();
    });

    it("should handle if no correct product id is provided", async () => {
        jest.mocked(getStatistik)
            .mockResolvedValue([]);
        const req = {
            params: { id: "1" },
            query: { groupBy: "kohler" }
        } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await getTaeglichenWarenausgang(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "groupBy muss 'day' sein" });
    });
});
import { expect, jest, describe, it } from "@jest/globals";
import { Request, Response } from "express";

import { getAllProdukte, getProduktById, suchProdukteByName } from "../../src/controllers/produkt.controller";
import { alleProdukte, produktById, searchProdukteByName } from "../../src/services/produkt.service";

jest.mock("../../src/services/produkt.service", () => ({
    alleProdukte: jest.fn(),
    produktById: jest.fn(),
    searchProdukteByName: jest.fn()
}));

describe("Produkt", () => {

    it("should get all products", async () => {

        const expectedProducts = [
            {
                produktId: 1,
                produktName: "Laptop",
                produktBeschreibung: "Lenovo ThinkPad",
                produktMenge: 10
            },
            {
                produktId: 2,
                produktName: "Maus",
                produktBeschreibung: "Logitech kabellose Maus",
                produktMenge: 25
            }
        ];


        jest.mocked(alleProdukte)
            .mockResolvedValue(expectedProducts as any);

        const req = {} as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await getAllProdukte(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedProducts);

    });

    it("should handle error when getting all products", async () => {
        jest.mocked(alleProdukte)
            .mockRejectedValue(new Error("Fehler beim Abrufen der Produkte"));

        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await getAllProdukte(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Fehler beim Abrufen der Produkte" });

    });

    it("should get product by id", async () => {

        const expectedProducts = {
            produktId: 1,
            produktName: "Laptop",
            produktBeschreibung: "Lenovo ThinkPad",
            produktMenge: 10
        };


        jest.mocked(produktById)
            .mockResolvedValue(expectedProducts as any);
        const req = {
            params: { id: "1" }
        } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        await getProduktById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedProducts);
    });

    it("should handle error when getting product by id", async () => {
        jest.mocked(produktById)
            .mockRejectedValue(new Error("Fehler beim Abrufen des Produkts"));
        const req = {
            params: { id: "1" }
        } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        await getProduktById(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Fehler beim Abrufen des Produkts' });
    });
    it("should search products by name", async () => {
        const expectedProducts = [
            {
                produktId: 1,
                produktName: "Laptop",
                produktBeschreibung: "Lenovo ThinkPad",
                produktMenge: 10
            }
        ];

        jest.mocked(searchProdukteByName)
            .mockResolvedValue(expectedProducts as any);

        const req = {
            query: { name: "Laptop" }
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await suchProdukteByName(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedProducts);
    });
    it("should handle if no product found when getting product by id", async () => {
        jest.mocked(produktById)
            .mockResolvedValue(null);
        const req = {
            params: { id: "99" }
        } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        await getProduktById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Produkt nicht gefunden' });
    });
    it("should handle if no products found when searching by name", async () => {
        jest.mocked(searchProdukteByName)
            .mockResolvedValue([]);
        const req = {
            query: { name: "abc"}
                    
             } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await suchProdukteByName(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Ungültiger Suchbegriff' });
    });
});

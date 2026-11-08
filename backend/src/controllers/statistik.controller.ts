
import { Request, Response } from "express";
import { getStatistik } from "../services/statistik.service";

export async function getTaeglichenWarenausgang(
    req: Request,
    res: Response
) {
    try {
        const produktId = Number(req.params.id);
        const groupBy = req.query.groupBy;

        if (!Number.isInteger(produktId) || produktId <= 0) {
            return res.status(400).json({
                message: "Ungültige Produkt-ID"
            });
        }

        if (groupBy !== "day") {
            return res.status(400).json({
                message: "groupBy muss 'day' sein"
            });
        }

        const statistik = await getStatistik(produktId);

        return res.status(200).json(statistik);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Fehler beim Abrufen der Statistik"
        });
    }
}

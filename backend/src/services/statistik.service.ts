
import { Warenbewegung } from "../models/warenbewegung.model";

export async function getStatistik(produktId: number, date?: string) {

    const bewegungen = await Warenbewegung.findAll({
        where: {
            produktId: produktId,
            bewegungTyp: "AUSGANG"
        }
    });

    const statistik: Record<string, number> = {};

    for (const bewegung of bewegungen) {

        const datum = new Date(bewegung.getDataValue("bewegungsDatum"))
            .toISOString()
            .slice(0, 10);


        const menge = Number(bewegung.getDataValue("menge"));

        statistik[datum] = (statistik[datum] || 0) + menge;
    }

    return Object.entries(statistik)
        .map(([datum, menge]) => ({ datum, menge }))
        .sort((a, b) => a.datum.localeCompare(b.datum));
}

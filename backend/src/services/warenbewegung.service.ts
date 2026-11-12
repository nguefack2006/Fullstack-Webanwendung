import {getBewegungen} from "../models/warenbewegung.model";

export async function getProduktBewegungen(produktId: number) {
    if (!Number.isInteger(produktId) || produktId <= 0) {
        throw new Error('Ungültige Produkt-ID');
    }
    return getBewegungen(produktId);
}
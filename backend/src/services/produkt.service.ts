import {getAll, getById, searchByName} from "../models/produkt.model";

export function alleProdukte() {
    return getAll();
}

export function produktById(produktId: number) {
    return getById(produktId);
}
 
export function searchProdukteByName(name: string) {
    return searchByName(name);
}



import { Produkt } from "../models/produkt.model";
import { Benutzer } from "../models/benutzer.model";
import { Warenbewegung } from "../models/warenbewegung.model";
import { sequelize } from "../config/postgres";
import { eventBus } from "../events/event.bus";

export async function wareneingangBuchen(
    produktId: number,
    benutzerId: number,
    menge: number
) {

    console.log("[WARENEINGANG] Gestartet", {
        produktId,
        menge
    });


    if (!Number.isInteger(produktId) || produktId <= 0) {
        throw new Error("Ungültige Produkt-ID");
    }


    if (!Number.isFinite(menge) || menge <= 0) {
        throw new Error("Ungültige Menge");
    }

    const warenbewegung = await sequelize.transaction(async (transaction) => {

        const produkt = await Produkt.findByPk(produktId, { transaction });

        if (!produkt) {
            throw new Error("Produkt nicht gefunden");
        }

        const benutzer = await Benutzer.findByPk(benutzerId, { transaction });

        if (!benutzer) {
            throw new Error("Benutzer nicht gefunden");
        }

        await produkt.increment("produktMenge", { by: menge, transaction });

        const warenbewegung = await Warenbewegung.create({
            produktId,
            benutzerId,
            bewegungTyp: "EINGANG",
            menge
        }, { transaction });

        return warenbewegung;
    });
    console.log("[WARENEINGANG] COMMIT erfolgreich", {
        produktId,
        menge
    });


    eventBus.emit("WarenbewegungErfasst", {
        eventTyp: "WARENEINGANG",
        produktId,
        benutzerId,
        menge
    });

    console.log("[WARENEINGANG] Journal-Event veröffentlicht");

    return warenbewegung;
}

export async function warenausgangBuchen(
    produktId: number,
    benutzerId: number,
    menge: number
) {

    console.log("[WARENAUSGANG] Buchung gestartet", {
        produktId,
        benutzerId,
        menge
    });

    if (!Number.isInteger(produktId) || produktId <= 0) {
        throw new Error("Ungültige Produkt-ID");
    }


    if (!Number.isFinite(menge) || menge <= 0) {
        throw new Error("Ungültige Menge");
    }

    const warenbewegung = await sequelize.transaction(async (transaction) => {

        const produkt = await Produkt.findByPk(produktId, {
            transaction,
            lock: transaction.LOCK.UPDATE
        });

        if (!produkt) {
            throw new Error("Produkt nicht gefunden");
        }

        const benutzer = await Benutzer.findByPk(benutzerId, { transaction });

        if (!benutzer) {
            throw new Error("Benutzer nicht gefunden");
        }

        if (Number(produkt.get("produktMenge")) < menge) {
            console.warn("[WARENAUSGANG] Nicht genügend Bestand", {
                produktId,
                menge,
                angefordert: menge
            });
            throw new Error("Nicht genügend Lagerbestand");
        }

        await produkt.decrement("produktMenge", { by: menge, transaction });

        const warenbewegung = await Warenbewegung.create({
            produktId,
            benutzerId,
            bewegungTyp: "AUSGANG",
            menge
        }, { transaction });

        return warenbewegung;
    });

    console.log("[WARENAUSGANG] COMMIT erfolgreich", {
        produktId,
        menge
    });

    eventBus.emit("WarenbewegungErfasst", {
        eventTyp: "WARENAUSGANG",
        produktId,
        benutzerId,
        menge
    });

    console.log("[WARENAUSGANG] Journal-Event veröffentlicht");

    return warenbewegung;
}

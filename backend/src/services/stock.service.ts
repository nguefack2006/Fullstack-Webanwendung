import { Produkt } from "../models/produkt.model";
import { Benutzer } from "../models/benutzer.model";
import { Warenbewegung } from "../models/warenbewegung.model";
import { sequelize } from "../config/postgres";

export async function wareneingangBuchen(
    produktId: number,
    benutzerId: number,
    menge: number
) {

    if (!Number.isInteger(produktId) || produktId <= 0) {
        throw new Error('Ungültige Produkt-ID');
    }
    if (!Number.isInteger(benutzerId) || benutzerId <= 0) {
        throw new Error('Ungültige Benutzer-ID');
    }
    if (!Number.isFinite(menge) || menge <= 0) {
        throw new Error('Ungültige Menge');
    }

    return sequelize.transaction(async (transaction) => {

        const produkt = await Produkt.findByPk(produktId, { transaction });
        if (!produkt) {
            throw new Error('Produkt nicht gefunden');
        }


        const benutzer = await Benutzer.findByPk(benutzerId, { transaction });
        if (!benutzer) {
            throw new Error('Benutzer nicht gefunden');
        }

        await produkt.increment('produktMenge', { by: menge, transaction });

        const warenbewegung = await Warenbewegung.create({
            produktId,
            benutzerId,
            bewegungTyp: 'EINGANG',
            menge
        }, { transaction });

        return warenbewegung;
    });


}

export async function warenausgangBuchen(
    produktId: number,
    benutzerId: number,
    menge: number
) {
    if (!Number.isInteger(produktId) || produktId <= 0) {
        throw new Error('Ungültige Produkt-ID');
    }
    if (!Number.isInteger(benutzerId) || benutzerId <= 0) {
        throw new Error('Ungültige Benutzer-ID');
    }
    if (!Number.isFinite(menge) || menge <= 0) {
        throw new Error('Ungültige Menge');
    }

    return sequelize.transaction(async (transaction) => {
        const produkt = await Produkt.findByPk(produktId, { transaction,
             lock: transaction.LOCK.UPDATE
         });
        if (!produkt) {
            throw new Error('Produkt nicht gefunden');
        }
        const benutzer = await Benutzer.findByPk(benutzerId, { transaction
         });
        if (!benutzer) {
            throw new Error('Benutzer nicht gefunden');
        }
        if (Number(produkt.get('produktMenge')) < menge) {
            throw new Error("Nicht genügend Lagerbestand");
        }

        await produkt.decrement('produktMenge', { by: menge, transaction });

        const warenbewegung = await Warenbewegung.create({
            produktId,
            benutzerId,
            bewegungTyp: 'AUSGANG',
            menge
        }, { transaction });
        return warenbewegung;
    })

}


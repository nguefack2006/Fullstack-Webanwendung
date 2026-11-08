import { DataType, DataTypes } from "sequelize"
import { sequelize } from "../config/postgres"

const Benutzer = sequelize.define('benutzer', {
    benutzerId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false   
    },
    benutzerVorname:{
        type: DataTypes.STRING,
        allowNull:false
    },
    benutzerNachname:{
        type: DataTypes.STRING,
        allowNull:false
    },
    benutzerEmail:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    benutzerGeburtsdatum:{
        type: DataTypes.DATE,
        allowNull:true
    },
    benutzerRolle:{
        type: DataTypes.ENUM('LAGERVERWALTER', 'LAGERASSISTENT'),
        allowNull:false
    },
    benutzerPasswortHash: {
    type: DataTypes.STRING,
    allowNull: false,
    }
})

export function createBenutzer(daten: {
    benutzerId: number;
    benutzerVorname: string;
    benutzerNachname: string;
    benutzerEmail: string;
    benutzerPasswortHash: string;
    benutzerRolle: 'LAGERVERWALTER' | 'LAGERASSISTENT';
    benutzerGeburtsdatum?: Date;
}) {
    return Benutzer.create({
        benutzerId: daten.benutzerId,
        benutzerVorname: daten.benutzerVorname,
        benutzerNachname: daten.benutzerNachname,
        benutzerEmail: daten.benutzerEmail,
        benutzerPasswortHash: daten.benutzerPasswortHash,
        benutzerRolle: daten.benutzerRolle,
        benutzerGeburtsdatum: daten.benutzerGeburtsdatum
    });
}
export function getBenutzerByEmail(benutzerEmail: string) {
    return Benutzer.findOne({
        where: { benutzerEmail }
    });
}

export function getBenutzerById(benutzerId: number) {
    return Benutzer.findByPk(benutzerId, {
        attributes: [
            'benutzerId',
            'benutzerVorname',
            'benutzerNachname',
            'benutzerEmail',
            'benutzerRolle'
        ]
    });
}
export { Benutzer };
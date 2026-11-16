import { DataType, DataTypes } from "sequelize"
import { sequelize } from "../config/postgres"

const Benutzer = sequelize.define('benutzer', {
    benutzerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
<<<<<<< HEAD
        autoIncrement: true,
        allowNull: false
=======
        allowNull:false,
        autoIncrement: true   
>>>>>>> a513851e917b27617574dfd5c170f83f99365934
    },
    benutzerVorname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    benutzerNachname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    benutzerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    benutzerGeburtsdatum: {
        type: DataTypes.DATE,
        allowNull: true
    },
    benutzerRolle: {
        type: DataTypes.ENUM('LAGERVERWALTER', 'LAGERASSISTENT'),
        allowNull: false
    },
    benutzerPasswortHash: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    indexes: [
        {
            name: 'unique_lagerverwalter',
            unique: true,
            fields: ['benutzerRolle'],
            where: { benutzerRolle: 'LAGERVERWALTER' }
        }
    ]
});


export function createBenutzer(daten: {
    benutzerVorname: string;
    benutzerNachname: string;
    benutzerEmail: string;
    benutzerPasswortHash: string;
    benutzerRolle: 'LAGERVERWALTER' | 'LAGERASSISTENT';
    benutzerGeburtsdatum?: Date;
}) {
    return Benutzer.create({
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
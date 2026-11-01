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
        allowNull:false
    },
    benutzerGeburtsdatum:{
        type: DataTypes.DATE,
        allowNull:true
    },
    benutzerRolle:{
        type: DataTypes.ENUM('LAGERVERWALTER', 'LAGERASSISTENT'),
        allowNull:false
    }
})
export { Benutzer };
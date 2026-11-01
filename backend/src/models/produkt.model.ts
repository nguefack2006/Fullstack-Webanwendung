import { DataTypes } from 'sequelize';
import { sequelize } from '../config/postgres';
import { Benutzer } from './benutzer.model';

const Produkt = sequelize.define('produkt', {
    produktId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    produktReferenz: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    produktName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    lagerbestand: {
        type: DataTypes.DECIMAL(12, 3),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },

    erstelltVon: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Benutzer,
            key: 'benutzerId'
        },
        onDelete: 'RESTRICT'
    }
}, {
    tableName: 'produkt',
    timestamps: false
});

export { Produkt };
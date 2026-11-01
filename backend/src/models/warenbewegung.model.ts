import { DataTypes } from 'sequelize';
import { sequelize } from '../config/postgres';
import { Benutzer } from './benutzer.model';
import { Produkt } from './produkt.model';

const Warenbewegung = sequelize.define('warenbewegung', {
    bewegungId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    produktId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produkt,
            key: 'produktId'
        },
        onDelete: 'RESTRICT'
    },

    benutzerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Benutzer,
            key: 'benutzerId'
        },
        onDelete: 'RESTRICT'
    },

    bewegungTyp: {
        type: DataTypes.ENUM('EINGANG', 'AUSGANG'),
        allowNull: false
    },

    menge: {
        type: DataTypes.DECIMAL(12, 3),
        allowNull: false,
        validate: {
            min: 0
        }
    },

    zeitpunkt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    grund: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'warenbewegung',
    timestamps: false
});

export { Warenbewegung };
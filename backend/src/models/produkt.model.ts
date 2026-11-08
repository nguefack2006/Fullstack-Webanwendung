import { DataTypes, Op } from 'sequelize';
import { sequelize } from '../config/postgres';
import { Benutzer } from './benutzer.model';
import { Warenbewegung } from './warenbewegung.model';


const Produkt = sequelize.define('produkt', {
    produktId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true

    },

    produktName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    produktBeschreibung: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    produktMenge: {
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

export function getAll() {
    return Produkt.findAll();
}

export function getById(produktId: number) {
    return Produkt.findByPk(produktId);
}

export function searchByName(name: string) {
    return Produkt.findAll({
        where: {
            produktName: {
                [Op.iLike]: `%${name}%`
            }
        }
    });
}

export function createProdukt(produkt: {
    produktId: number;
    produktName: string;
    produktBeschreibung: string;
    erstelltVon: number;
}) {
    return Produkt.create({
        produktId: produkt.produktId,
        produktName: produkt.produktName,
        produktBeschreibung: produkt.produktBeschreibung,
        erstelltVon: produkt.erstelltVon
    });
}

export function updateProdukt(
    produktId: number,
    daten: {
        produktName?: string;
        produktBeschreibung?: string;
    }
) {
    return Produkt.update(daten, {
        where: { produktId },
        fields: ['produktName', 'produktBeschreibung']
    });
}

export function deleteProdukt(produktId: number) {
    return Produkt.destroy({
        where: { produktId }
    });
}


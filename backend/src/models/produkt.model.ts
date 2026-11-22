import { DataTypes, Op } from 'sequelize';
import { sequelize } from '../config/postgres';
import { Benutzer } from './benutzer.model';


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
    produktName: string;
    produktBeschreibung: string;
    erstelltVon: number;
}) {
    return Produkt.create({
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
        produktMenge?: number;
    }
) {
    return sequelize.transaction(async (transaction) => {
        const produkt = await Produkt.findByPk(produktId, {
            transaction,
            lock: transaction.LOCK.UPDATE
        });

        if (!produkt) {
            return null;
        }

        const alteMenge = Number(produkt.get('produktMenge'));

        await produkt.update(daten, { transaction });
        await produkt.reload({ transaction });

        const neueMenge = Number(produkt.get('produktMenge'));

        return { alteMenge, neueMenge };
    });
}
export function deleteProdukt(produktId: number) {
    return Produkt.destroy({
        where: { produktId }
    });
}

export { Produkt };
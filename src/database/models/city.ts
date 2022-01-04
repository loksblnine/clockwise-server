import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/config";

export interface ICity {
    city_id?: number,
    city_name: string,
}

export type ICityInput = Optional<ICity, 'city_name'>
export type ICityOutput = Required<ICity>

export class City extends Model<ICity, ICityInput> implements ICity {
    public city_id!: number
    public city_name!: string

}

City.init({
        city_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        city_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                is: /^[A-ZА-Яa-zа-я -]+$/i
            }
        }
    },
    {
        tableName: 'city',
        schema: 'public',
        timestamps: false,
        sequelize,
        indexes: [
            {
                name: "city_city_id_uindex",
                unique: true,
                fields: [
                    {name: "city_id"},
                ]
            },
            {
                name: "city_pk",
                unique: true,
                fields: [
                    {name: "city_id"},
                ]
            },
        ]
    })

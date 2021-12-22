import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/config";
import {City} from "./city";
import {Master} from "./master";

export interface ICityToMaster {
    city_id: number,
    master_id: number,
}

export type IDepsInput = Optional<ICityToMaster, 'city_name' & 'master_id'>
export type IDepsOutput = Required<ICityToMaster>

export class CityToMaster extends Model<ICityToMaster, IDepsInput> implements ICityToMaster {
    public city_id!: number
    public master_id!: number;
}

CityToMaster.init({
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: City,
                key: 'city_id'
            }
        },
        master_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Master,
                key: 'master_id'
            }
        }
    },
    {
        sequelize,
        tableName: 'connect_city_master',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "connect_city_master_city_id_master_id_uindex",
                unique: true,
                fields: [
                    {name: "city_id"},
                    {name: "master_id"},
                ]
            },
        ]
    })
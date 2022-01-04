import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/config";

export interface IMaster {
    master_id?: number,
    master_name: string,
    email: string,
    ranking: string,
    isApproved?: boolean
}

export type IMasterInput = Optional<IMaster, 'email' & 'master_name' & 'ranking'>
export type IMasterOutput = Required<IMaster>

export class Master extends Model<IMaster, IMasterInput> implements IMaster {
    public master_id!: number;
    public email!: string;
    public isApproved!: boolean;
    public master_name!: string;
    public ranking!: string;

}

Master.init({
        master_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        master_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                is: /^[A-ZА-Яa-zа-я -]+$/i
            }
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                is: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i
            }
        },
        ranking: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        isApproved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        tableName: 'master',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "master_master_id_uindex",
                unique: true,
                fields: [
                    { name: "master_id" },
                ]
            },
            {
                name: "master_pk",
                unique: true,
                fields: [
                    { name: "master_id" },
                ]
            },
        ]
    })

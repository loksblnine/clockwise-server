import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/config";

export interface IType {
    work_id?: number,
    description: string,
}

export type ITypeInput = Optional<IType, 'description'>
export type ITypeOutput = Required<IType>

export class Type extends Model<IType, ITypeInput> implements IType {
    public work_id!: number
    public description!: string
}

Type.init({
        work_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        tableName: 'workType',
        schema: 'public',
        timestamps: false,
        sequelize,
        indexes: [
            {
                name: "worktype_pk",
                unique: true,
                fields: [
                    {name: "work_id"},
                ]
            },
            {
                name: "worktype_work_id_uindex",
                unique: true,
                fields: [
                    {name: "work_id"},
                ]
            },
        ]
    })

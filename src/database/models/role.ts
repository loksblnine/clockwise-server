import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/config";

export interface IRole {
    role_id?: number,
    description: string,
}

export type IRoleInput = Optional<IRole, 'description'>
export type ICityOutput = Required<IRole>

export class Role extends Model<IRole, IRoleInput> implements IRole {
    public role_id!: number
    public description!: string
}

Role.init({
        role_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'role',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "role_pk",
                unique: true,
                fields: [
                    {name: "role_id"},
                ]
            },
            {
                name: "role_role_id_uindex",
                unique: true,
                fields: [
                    {name: "role_id"},
                ]
            },
        ]
    });

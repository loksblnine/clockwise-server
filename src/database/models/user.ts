import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/config";

export interface IUser {
    user_id?: number,
    email: string,
    password: string,
    role: number,
    isActive?: boolean
}
export type IUserInput = Optional<IUser, 'email' & 'password' & 'role'>
export type IUserOutput = Required<IUser>

export class User extends Model<IUser, IUserInput> implements IUser {
    public user_id!: number;
    public email!: string;
    public password!: string;
    public role!: number;
    public isActive!: boolean;
}

User.init({
    user_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            is: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    tableName: 'user',
    schema: 'public',
    timestamps: false,
    indexes: [
        {
            name: "user_email_password_uindex",
            unique: true,
            fields: [
                {name: "email"},
                {name: "role"},
            ]
        },
        {
            name: "user_pk",
            unique: true,
            fields: [
                {name: "user_id"},
            ]
        },
        {
            name: "user_user_id_uindex",
            unique: true,
            fields: [
                {name: "user_id"},
            ]
        },
    ]
})

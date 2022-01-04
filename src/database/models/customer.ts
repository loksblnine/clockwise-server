import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/config";

export interface ICustomer {
    customer_id?: number,
    customer_name: string,
    customer_email: string,
}

export type ICustomerInput = Optional<ICustomer, 'customer_name' & 'customer_email'>
export type ICustomerOutput = Required<ICustomer>

export class Customer extends Model<ICustomer, ICustomerInput> implements ICustomer {
    public customer_id!: number
    public customer_name!: string
    public customer_email!: string
}

Customer.init({
        customer_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        customer_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                is: /^[A-ZА-Яa-zа-я -]+$/i
            }
        },
        customer_email: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                is: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i
            }
        }
    },
    {
        tableName: 'customer',
        schema: 'public',
        timestamps: false,
        sequelize,
        indexes: [
            {
                name: "customer_customer_id_uindex",
                unique: true,
                fields: [
                    {name: "customer_id"},
                ]
            },
            {
                name: "customer_pk",
                unique: true,
                fields: [
                    {name: "customer_id"},
                ]
            },
        ]
    })

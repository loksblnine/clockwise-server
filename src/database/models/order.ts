import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/config";
import {ICity} from "./city";
import {ICustomer} from "./customer";
import {IMaster} from "./master";

export interface IOrder {
    order_id?: number,
    master_id: number,
    customer_id: number,
    city_id: number,
    work_id: number,
    order_time: Date,
    isDone: boolean,
    mark: number | null
    isPaid: string
    'work.price'?: any
}

export type IOrderInput = Optional<IOrder, 'master_id' & ('customer_id' | 'customer_email') & 'city_id' & 'work_id' & 'order_time'>
export type IOrderOutput = Required<IOrder>

export class Order extends Model<IOrder, IOrderInput> implements IOrder {
    public order_id!: number;
    public customer_id!: number;
    public isDone!: boolean;
    public master_id!: number;
    public order_time!: Date;
    public work_id!: number;
    public mark!: number | null;
    public city_id!: number;
    public isPaid!: string;
    public city!: ICity;
    public customer!: ICustomer;
    public master!: IMaster;
    public "city.city_name"!: string
}

Order.init({
    order_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customer',
            key: 'customer_id'
        }
    },
    master_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'master',
            key: 'master_id'
        }
    },
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'city',
            key: 'city_id'
        }
    },
    work_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'workType',
            key: 'work_id'
        }
    },
    order_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    mark: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    tableName: 'order',
    schema: 'public',
    timestamps: false,
    indexes: [
        {
            name: "order_master_id_city_id_order_time_uindex",
            unique: true,
            fields: [
                {name: "master_id"},
                {name: "city_id"},
                {name: "order_time"},
            ]
        },
        {
            name: "order_order_id_uindex",
            unique: true,
            fields: [
                {name: "order_id"},
            ]
        },
        {
            name: "order_pk",
            unique: true,
            fields: [
                {name: "order_id"},
            ]
        },
    ]
})

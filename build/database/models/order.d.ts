import { Model, Optional } from "sequelize";
export interface IOrder {
    order_id?: number;
    master_id: number;
    customer_id: number;
    city_id: number;
    work_id: number;
    order_time: Date;
    isDone: boolean;
    mark: number | null;
}
export declare type IOrderInput = Optional<IOrder, 'master_id' & ('customer_id' | 'customer_email') & 'city_id' & 'work_id' & 'order_time'>;
export declare type IOrderOutput = Required<IOrder>;
export declare class Order extends Model<IOrder, IOrderInput> implements IOrder {
    order_id: number;
    customer_id: number;
    isDone: boolean;
    master_id: number;
    order_time: Date;
    work_id: number;
    mark: number | null;
    city_id: number;
}
//# sourceMappingURL=order.d.ts.map
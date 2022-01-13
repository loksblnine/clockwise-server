import { Model, Optional } from "sequelize";
export interface ICustomer {
    customer_id?: number;
    customer_name: string;
    customer_email: string;
}
export declare type ICustomerInput = Optional<ICustomer, 'customer_name' & 'customer_email'>;
export declare type ICustomerOutput = Required<ICustomer>;
export declare class Customer extends Model<ICustomer, ICustomerInput> implements ICustomer {
    customer_id: number;
    customer_name: string;
    customer_email: string;
}
//# sourceMappingURL=customer.d.ts.map
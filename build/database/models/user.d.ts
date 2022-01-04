import { Model, Optional } from "sequelize";
export interface IUser {
    user_id?: number;
    email: string;
    password: string;
    role: number;
    isActive?: boolean;
}
export declare type IUserInput = Optional<IUser, 'email' & 'password' & 'role'>;
export declare type IUserOutput = Required<IUser>;
export declare class User extends Model<IUser, IUserInput> implements IUser {
    user_id: number;
    email: string;
    password: string;
    role: number;
    isActive: boolean;
}
//# sourceMappingURL=user.d.ts.map
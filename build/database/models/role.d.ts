import { Model, Optional } from "sequelize";
export interface IRole {
    role_id?: number;
    description: string;
}
export declare type IRoleInput = Optional<IRole, 'description'>;
export declare type ICityOutput = Required<IRole>;
export declare class Role extends Model<IRole, IRoleInput> implements IRole {
    role_id: number;
    description: string;
}
//# sourceMappingURL=role.d.ts.map
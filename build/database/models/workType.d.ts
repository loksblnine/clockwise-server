import { Model, Optional } from "sequelize";
export interface IType {
    work_id?: number;
    description: string;
    time: string;
    price: number;
}
export declare type ITypeInput = Optional<IType, 'description'>;
export declare type ITypeOutput = Required<IType>;
export declare class Type extends Model<IType, ITypeInput> implements IType {
    work_id: number;
    description: string;
    time: string;
    price: number;
}
//# sourceMappingURL=workType.d.ts.map
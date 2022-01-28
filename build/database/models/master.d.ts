import { Model, Optional } from "sequelize";
export interface IMaster {
    master_id?: number;
    master_name: string;
    email: string;
    ranking: string;
    isApproved?: boolean;
}
export declare type IMasterInput = Optional<IMaster, 'email' & 'master_name' & 'ranking'>;
export declare type IMasterOutput = Required<IMaster>;
export declare class Master extends Model<IMaster, IMasterInput> implements IMaster {
    master_id: number;
    email: string;
    isApproved: boolean;
    master_name: string;
    ranking: string;
}
//# sourceMappingURL=master.d.ts.map
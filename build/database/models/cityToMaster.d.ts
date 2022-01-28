import { Model, Optional } from "sequelize";
export interface ICityToMaster {
    city_id: number;
    master_id: number;
}
export declare type IDepsInput = Optional<ICityToMaster, 'city_id' & 'master_id'>;
export declare type IDepsOutput = Required<ICityToMaster>;
export declare class CityToMaster extends Model<ICityToMaster, IDepsInput> implements ICityToMaster {
    city_id: number;
    master_id: number;
}
//# sourceMappingURL=cityToMaster.d.ts.map
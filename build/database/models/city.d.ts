import { Model, Optional } from "sequelize";
export interface ICity {
    city_id?: number;
    city_name: string;
}
export declare type ICityInput = Optional<ICity, 'city_name'>;
export declare type ICityOutput = Required<ICity>;
export declare class City extends Model<ICity, ICityInput> implements ICity {
    city_id: number;
    city_name: string;
}
//# sourceMappingURL=city.d.ts.map
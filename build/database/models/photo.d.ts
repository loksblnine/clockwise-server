import { Model, Optional } from "sequelize";
export interface IPhoto {
    order_id: number;
    photo_url: string;
}
export declare type IPhotoInput = Optional<IPhoto, 'order_id' & 'photo_url'>;
export declare type IPhotoOutput = Required<IPhoto>;
export declare class Photo extends Model<IPhoto, IPhotoInput> implements IPhoto {
    order_id: number;
    photo_url: string;
}
//# sourceMappingURL=photo.d.ts.map
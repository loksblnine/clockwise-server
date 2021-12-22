import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/config";

export interface IPhoto {
    order_id: number,
    photo_url: string,
}

export type IPhotoInput = Optional<IPhoto, 'order_id' & 'photo_url'>
export type IPhotoOutput = Required<IPhoto>

export class Photo extends Model<IPhoto, IPhotoInput> implements IPhoto {
    public order_id!: number
    public photo_url!: string
}

Photo.init({
        order_id: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        photo_url: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        tableName: 'photo',
        schema: 'public',
        timestamps: false,
        sequelize,
        indexes: [
            {
                name: "photo_photo_url_uindex",
                unique: true,
                fields: [
                    {name: "photo_url"},
                ]
            },
        ]
    })

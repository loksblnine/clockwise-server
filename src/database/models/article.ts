import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/config";

export interface IArticle {
    article_id?: number,
    header: string,
    body: string,
    photo?: string
}

export type IArticleInput = Optional<IArticle, 'header' & 'body'>
export type IArticleOutput = Required<IArticle>

export class Article extends Model<IArticle, IArticleInput> implements IArticle {
    public article_id!: number
    public header!: string
    public body!: string
    public photo!: string
}

Article.init({
        article_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        header: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        photo: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    },
    {
        tableName: 'blog',
        schema: 'public',
        timestamps: false,
        sequelize,
        indexes: [
            {
                name: "blog_article_id_uindex",
                unique: true,
                fields: [
                    {name: "article_id"},
                ]
            },
            {
                name: "blog_pk",
                unique: true,
                fields: [
                    {name: "article_id"},
                ]
            },
        ]
    })

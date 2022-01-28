import { Model, Optional } from "sequelize";
export interface IArticle {
    article_id?: number;
    header: string;
    body: string;
    photo?: string;
}
export declare type IArticleInput = Optional<IArticle, 'header' & 'body'>;
export declare type IArticleOutput = Required<IArticle>;
export declare class Article extends Model<IArticle, IArticleInput> implements IArticle {
    article_id: number;
    header: string;
    body: string;
    photo: string;
}
//# sourceMappingURL=article.d.ts.map
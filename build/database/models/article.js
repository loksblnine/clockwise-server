"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
class Article extends sequelize_1.Model {
}
exports.Article = Article;
Article.init({
    article_id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    header: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    body: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    photo: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: 'blog',
    schema: 'public',
    timestamps: false,
    sequelize: config_1.sequelize,
    indexes: [
        {
            name: "blog_article_id_uindex",
            unique: true,
            fields: [
                { name: "article_id" },
            ]
        },
        {
            name: "blog_pk",
            unique: true,
            fields: [
                { name: "article_id" },
            ]
        },
    ]
});
//# sourceMappingURL=article.js.map
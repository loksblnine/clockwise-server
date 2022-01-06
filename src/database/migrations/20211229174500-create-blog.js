'use strict';
const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/config");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('blog', {
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
                    allowNull: true
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
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('blog');
    }
};

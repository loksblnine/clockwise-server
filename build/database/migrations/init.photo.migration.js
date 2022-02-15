'use strict';
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('photo', {
            order_id: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            photo_url: {
                type: DataTypes.TEXT,
                allowNull: false,
            }
        }, {
            tableName: 'photo',
            schema: 'public',
            timestamps: false,
            sequelize,
            indexes: [
                {
                    name: "photo_photo_url_uindex",
                    unique: true,
                    fields: [
                        { name: "photo_url" },
                    ]
                },
            ]
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('photo');
    }
};
//# sourceMappingURL=init.photo.migration.js.map
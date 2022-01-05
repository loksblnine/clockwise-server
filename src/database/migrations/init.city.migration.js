'use strict';
const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/config");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('city', {
                city_id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true
                },
                city_name: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    validate: {
                        is: /^[A-ZА-Яa-zа-я -]+$/i
                    }
                }
            },
            {
                tableName: 'city',
                schema: 'public',
                timestamps: false,
                sequelize,
                indexes: [
                    {
                        name: "city_city_id_uindex",
                        unique: true,
                        fields: [
                            {name: "city_id"},
                        ]
                    },
                    {
                        name: "city_pk",
                        unique: true,
                        fields: [
                            {name: "city_id"},
                        ]
                    },
                ]
            })
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('city');
    }
};

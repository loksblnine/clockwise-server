'use strict';
const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/config");
const {City, Master} = require("../models");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('connect_city_master', {
                city_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: City,
                        key: 'city_id'
                    }
                },
                master_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Master,
                        key: 'master_id'
                    }
                }
            },
            {
                sequelize,
                tableName: 'connect_city_master',
                schema: 'public',
                timestamps: false,
                indexes: [
                    {
                        name: "connect_city_master_city_id_master_id_uindex",
                        unique: true,
                        fields: [
                            {name: "city_id"},
                            {name: "master_id"},
                        ]
                    },
                ]
            })
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('connect_city_master');
    }
};

'use strict';
const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/config");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('customer', {
                customer_id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                customer_name: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    validate: {
                        is: /^[A-ZА-Яa-zа-я -]+$/i
                    }
                },
                customer_email: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    validate: {
                        is: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i
                    }
                }
            },
            {
                tableName: 'customer',
                schema: 'public',
                timestamps: false,
                sequelize,
                indexes: [
                    {
                        name: "customer_customer_id_uindex",
                        unique: true,
                        fields: [
                            {name: "customer_id"},
                        ]
                    },
                    {
                        name: "customer_pk",
                        unique: true,
                        fields: [
                            {name: "customer_id"},
                        ]
                    },
                ]
            })
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('customer');
    }
};

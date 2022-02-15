'use strict';
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('order', {
            order_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            customer_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'customer',
                    key: 'customer_id'
                }
            },
            master_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'master',
                    key: 'master_id'
                }
            },
            city_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'city',
                    key: 'city_id'
                }
            },
            work_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'workType',
                    key: 'work_id'
                }
            },
            order_time: {
                type: DataTypes.DATE,
                allowNull: false
            },
            isDone: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            mark: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'order',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "order_master_id_city_id_order_time_uindex",
                    unique: true,
                    fields: [
                        { name: "master_id" },
                        { name: "city_id" },
                        { name: "order_time" },
                    ]
                },
                {
                    name: "order_order_id_uindex",
                    unique: true,
                    fields: [
                        { name: "order_id" },
                    ]
                },
                {
                    name: "order_pk",
                    unique: true,
                    fields: [
                        { name: "order_id" },
                    ]
                },
            ]
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('order');
    }
};
//# sourceMappingURL=init.order.migration.js.map
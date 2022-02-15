'use strict';
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('master', {
            master_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            master_name: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    is: /^[A-ZА-Яa-zа-я -]+$/i
                }
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    is: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i
                }
            },
            ranking: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            isApproved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }, {
            sequelize,
            tableName: 'master',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "master_master_id_uindex",
                    unique: true,
                    fields: [
                        { name: "master_id" },
                    ]
                },
                {
                    name: "master_pk",
                    unique: true,
                    fields: [
                        { name: "master_id" },
                    ]
                },
            ]
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('master');
    }
};
//# sourceMappingURL=init.master.migration.js.map
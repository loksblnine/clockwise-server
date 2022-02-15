'use strict';
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('workType', {
            work_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            }
        }, {
            tableName: 'workType',
            schema: 'public',
            timestamps: false,
            sequelize,
            indexes: [
                {
                    name: "worktype_pk",
                    unique: true,
                    fields: [
                        { name: "work_id" },
                    ]
                },
                {
                    name: "worktype_work_id_uindex",
                    unique: true,
                    fields: [
                        { name: "work_id" },
                    ]
                },
            ]
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('workType');
    }
};
//# sourceMappingURL=init.workType.migration.js.map
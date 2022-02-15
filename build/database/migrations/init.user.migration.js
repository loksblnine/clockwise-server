'use strict';
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('user', {
            user_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    is: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i
                }
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            role: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }, {
            sequelize,
            tableName: 'user',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "user_email_password_uindex",
                    unique: true,
                    fields: [
                        { name: "email" },
                        { name: "role" },
                    ]
                },
                {
                    name: "user_pk",
                    unique: true,
                    fields: [
                        { name: "user_id" },
                    ]
                },
                {
                    name: "user_user_id_uindex",
                    unique: true,
                    fields: [
                        { name: "user_id" },
                    ]
                },
            ]
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('user');
    }
};
//# sourceMappingURL=init.user.migration.js.map
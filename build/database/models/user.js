"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    user_id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            is: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i
        }
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    role: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: config_1.sequelize,
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
//# sourceMappingURL=user.js.map
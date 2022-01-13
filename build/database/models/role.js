"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
class Role extends sequelize_1.Model {
}
exports.Role = Role;
Role.init({
    role_id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize: config_1.sequelize,
    tableName: 'role',
    schema: 'public',
    timestamps: false,
    indexes: [
        {
            name: "role_pk",
            unique: true,
            fields: [
                { name: "role_id" },
            ]
        },
        {
            name: "role_role_id_uindex",
            unique: true,
            fields: [
                { name: "role_id" },
            ]
        },
    ]
});
//# sourceMappingURL=role.js.map
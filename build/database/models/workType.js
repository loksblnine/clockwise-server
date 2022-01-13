"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
class Type extends sequelize_1.Model {
}
exports.Type = Type;
Type.init({
    work_id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    time: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'workType',
    schema: 'public',
    timestamps: false,
    sequelize: config_1.sequelize,
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
//# sourceMappingURL=workType.js.map
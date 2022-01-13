"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Master = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
class Master extends sequelize_1.Model {
}
exports.Master = Master;
Master.init({
    master_id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    master_name: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            is: /^[A-ZА-Яa-zа-я -]+$/i
        }
    },
    email: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            is: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i
        }
    },
    ranking: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    isApproved: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: config_1.sequelize,
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
//# sourceMappingURL=master.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
class City extends sequelize_1.Model {
}
exports.City = City;
City.init({
    city_id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    city_name: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            is: /^[A-ZА-Яa-zа-я -]+$/i
        }
    }
}, {
    tableName: 'city',
    schema: 'public',
    timestamps: false,
    sequelize: config_1.sequelize,
    indexes: [
        {
            name: "city_city_id_uindex",
            unique: true,
            fields: [
                { name: "city_id" },
            ]
        },
        {
            name: "city_pk",
            unique: true,
            fields: [
                { name: "city_id" },
            ]
        },
    ]
});
//# sourceMappingURL=city.js.map
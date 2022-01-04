"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityToMaster = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const city_1 = require("./city");
const master_1 = require("./master");
class CityToMaster extends sequelize_1.Model {
}
exports.CityToMaster = CityToMaster;
CityToMaster.init({
    city_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: city_1.City,
            key: 'city_id'
        }
    },
    master_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: master_1.Master,
            key: 'master_id'
        }
    }
}, {
    sequelize: config_1.sequelize,
    tableName: 'connect_city_master',
    schema: 'public',
    timestamps: false,
    indexes: [
        {
            name: "connect_city_master_city_id_master_id_uindex",
            unique: true,
            fields: [
                { name: "city_id" },
                { name: "master_id" },
            ]
        },
    ]
});
//# sourceMappingURL=cityToMaster.js.map
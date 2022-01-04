"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
class Photo extends sequelize_1.Model {
}
exports.Photo = Photo;
Photo.init({
    order_id: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    photo_url: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'photo',
    schema: 'public',
    timestamps: false,
    sequelize: config_1.sequelize,
    indexes: [
        {
            name: "photo_photo_url_uindex",
            unique: true,
            fields: [
                { name: "photo_url" },
            ]
        },
    ]
});
//# sourceMappingURL=photo.js.map
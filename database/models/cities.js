'use strict';
const {
    sequelize,
    DataTypes
} = require('sequelize');

module.exports = () => {
    const cities = sequelize.define('cities', {
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            serial: true,
            primaryKey: true
        },
        city_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, {})

    cities.associate = function (models){
        cities.belongsTo(models.connect_city_master, {
            foreignKey: 'city_id',
            as: 'city_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
        cities.belongsTo(models.orders, {
            foreignKey: 'city_id',
            as: 'city_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    }
    return cities;
};
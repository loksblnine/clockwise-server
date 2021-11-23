'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const masters = sequelize.define('masters', {
        master_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            serial: true,
            primaryKey: true
        },
        master_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        master_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        ranking: {
            type: DataTypes.DOUBLE
        }
    }, {})
    masters.associate = function (models) {
        masters.belongsTo(models.connect_city_master, {
            foreignKey: 'master_id',
            as: 'master_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
        masters.belongsTo(models.orders, {
            foreignKey: 'master_id',
            as: 'master_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    }
    return masters;
};
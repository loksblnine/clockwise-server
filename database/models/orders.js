'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const orders = sequelize.define('orders', {
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            serial: true,
            primaryKey: true
        },
        master_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        work_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        order_time:{
            type: DataTypes.DATE,
            allowNull: false
        },
        is_done:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {})

    orders.associate = function (models){
        orders.hasMany(models.customers, {
            foreignKey: 'customer_id',
            as: 'customer_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
        orders.hasMany(models.masters, {
            foreignKey: 'master_id',
            as: 'master_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
        orders.hasMany(models.cities, {
            foreignKey: 'city_id',
            as: 'city_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
        orders.hasMany(models.work_type, {
            foreignKey: 'work_id',
            as: 'work_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
    }
    return orders;
};
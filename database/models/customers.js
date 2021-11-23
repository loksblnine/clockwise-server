'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const customers = sequelize.define('customers', {
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            serial: true,
            primaryKey: true
        },
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        customer_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })
    customers.associate = function (models) {
        customers.belongsToMany(models.orders, {
            foreignKey: 'customer_id',
            as: 'customer_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
    }
    return customers;
};
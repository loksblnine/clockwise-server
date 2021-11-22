'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class orders extends Model {
        static associate(models) {
            // define association here
        }
    }

    orders.init({
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
    }, {
        sequelize,
        modelName: 'orders',
    });
    return orders;
};
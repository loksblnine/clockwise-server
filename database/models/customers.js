'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class customers extends Model {
        static associate(models) {
            // define association here
        }
    }

    customers.init({
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
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'customers',
    });
    return customers;
};
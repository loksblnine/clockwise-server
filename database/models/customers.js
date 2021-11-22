'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    sequelize.define('customers', {
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

    class customers extends Model {
        static associate(models) {
            // define association here
        }
    }

    customers.init({

    }, {
        sequelize,
        modelName: 'customers',
    });
    return customers;
};
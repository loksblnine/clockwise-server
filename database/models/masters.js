'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class masters extends Model {
        static associate(models) {
            // define association here
        }
    }

    masters.init({
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
        ranking:{
            type: DataTypes.DOUBLE
        }
    }, {
        sequelize,
        modelName: 'masters',
    });
    return masters;
};
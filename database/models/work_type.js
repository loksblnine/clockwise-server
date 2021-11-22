'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class work_type extends Model {
        static associate(models) {
            // define association here
        }
    }

    work_type.init({
        work_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            serial: true,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'work_type',
    });
    return work_type;
};
'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class connect_city_master extends Model {
        static associate(models) {
            // define association here
        }
    }

    connect_city_master.init({
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        master_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        indexes: [
            {
                unique: true,
                fields: ['city_id', 'master_id']
            }
        ]
    }, {
        sequelize,
        modelName: 'connect_city_master',
    });
    return connect_city_master;
};
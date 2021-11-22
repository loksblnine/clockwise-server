'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        static associate(models) {
            // define association here
        }
    }

    users.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            serial: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        indexes: [
            {
                unique: true,
                fields: ['email', 'password']
            }
        ]
    },{
        sequelize,
        modelName: 'users',
    });
    return users;
};
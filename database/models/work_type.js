'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const work_type = sequelize.define('work_type', {
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
    }, {});
    work_type.associate = function (models) {
        work_type.belongsTo(models.orders, {
            foreignKey: 'work_id',
            as: 'work_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
    }
    return work_type;
};
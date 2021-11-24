const {
    sequelize,
    DataTypes
} = require('sequelize');

module.exports = () => {
    const Order = sequelize.define('order', {
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

    Order.associate = function (models){
        Order.hasMany(models.Customer, {
            foreignKey: 'customer_id',
            as: 'customer_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
        Order.hasMany(models.Master, {
            foreignKey: 'master_id',
            as: 'master_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
        Order.hasMany(models.City, {
            foreignKey: 'city_id',
            as: 'city_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
        Order.hasMany(models.workTypeModel, {
            foreignKey: 'work_id',
            as: 'work_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
    }
    return Order;
};
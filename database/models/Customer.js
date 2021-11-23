const {
    sequelize,
    DataTypes
} = require('sequelize');

module.exports = () => {
    const Customer = sequelize.define('customer', {
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
    Customer.associate = function (models) {
        Customer.belongsToMany(models.Order, {
            foreignKey: 'customer_id',
            as: 'customer_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
    }
    return Customer;
};
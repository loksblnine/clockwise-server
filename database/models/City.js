const {
    sequelize,
    DataTypes
} = require('sequelize');

module.exports = () => {
    const City = sequelize.define('city', {
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            serial: true,
            primaryKey: true
        },
        city_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, {})

    City.associate = function (models){
        City.belongsTo(models.connect_city_master, {
            foreignKey: 'city_id',
            as: 'city_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
        City.belongsTo(models.Order, {
            foreignKey: 'city_id',
            as: 'city_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    }
    return City;
};
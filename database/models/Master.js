const {
    sequelize,
    DataTypes
} = require('sequelize');

module.exports = () => {
    const Master = sequelize.define('master', {
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
        ranking: {
            type: DataTypes.DOUBLE
        }
    }, {})
    Master.associate = function (models) {
        Master.belongsTo(models.connect_city_master, {
            foreignKey: 'master_id',
            as: 'master_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
        Master.belongsTo(models.Order, {
            foreignKey: 'master_id',
            as: 'master_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    }
    return Master;
};
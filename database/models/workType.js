const {
    sequelize,
    DataTypes
} = require('sequelize');

module.exports = () => {
    const workType = sequelize.define('workType', {
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
    workType.associate = function (models) {
        workType.belongsTo(models.Order, {
            foreignKey: 'work_id',
            as: 'work_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
    }
    return workType;
};
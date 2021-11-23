const {
    sequelize,
    DataTypes
} = require('sequelize');

module.exports = () => {
    const Role = sequelize.define('role', {
        role_id: {
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
    }, {})

    Role.associate = function (models) {
        Role.belongsTo(models.User, {
            foreignKey: 'role_id',
            as: 'role_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    }

    return Role;
};
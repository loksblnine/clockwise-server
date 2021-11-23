module.exports = (sequelize, DataTypes) => {
    const roles = sequelize.define({
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

    roles.associate = function (models) {
        roles.belongsTo(models.users, {
            foreignKey: 'role_id',
            as: 'role_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    }

    return roles;
};
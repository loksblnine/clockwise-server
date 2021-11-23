const {
    sequelize,
    DataTypes
} = require('sequelize');

module.exports = () => {
    const User = sequelize.define('user', {
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
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['email', 'password']
                }
            ]
        })

    User.associate = function(models) {
        User.hasMany(models.Role, {
            foreignKey: 'role_id',
            as: 'role',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    };
    return User;
}

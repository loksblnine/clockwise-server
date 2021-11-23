module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
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

    users.associate = function(models) {
        users.hasMany(models.roles, {
            foreignKey: 'role_id',
            as: 'role',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    };
    return users;
}

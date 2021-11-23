const {
    sequelize,
    DataTypes
} = require('sequelize');

module.exports = () => {
    const connect_city_master = sequelize.define('connect_city_master',
        {
            city_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            master_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        }, {
            indexes: [
                {
                    unique: true,
                    fields: ['city_id', 'master_id']
                }
            ]
        })

    connect_city_master.associate = function (models) {
        connect_city_master.belongsToMany(models.City, {
            foreignKey: 'city_id',
            as: 'city_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
        connect_city_master.belongsToMany(models.Master, {
            foreignKey: 'master_id',
            as: 'master_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    }


    return connect_city_master
}

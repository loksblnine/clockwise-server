module.exports = function (sequelize, DataTypes) {
    return sequelize.define('photo', {
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        photo_url: {
            primaryKey: true,
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: 'photo',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "photo_photo_url_uindex",
                unique: true,
                fields: [
                    {name: "photo_url"},
                ]
            },
        ]
    });
};

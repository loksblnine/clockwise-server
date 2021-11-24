module.exports = function(sequelize, DataTypes) {
  return sequelize.define('connect_city_master', {
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'city',
        key: 'city_id'
      }
    },
    master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'master',
        key: 'master_id'
      }
    }
  }, {
    sequelize,
    tableName: 'connect_city_master',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "connect_city_master_city_id_master_id_uindex",
        unique: true,
        fields: [
          { name: "city_id" },
          { name: "master_id" },
        ]
      },
    ]
  });
};

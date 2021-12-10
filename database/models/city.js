module.exports = function(sequelize, DataTypes) {
  return sequelize.define('city', {
    city_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      default: "nextval('city_city_id_seq'::regclass)"
    },
    city_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: /^[A-ZА-Яa-zа-я -]+$/i
      }
    }
  }, {
    sequelize,
    tableName: 'city',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "city_city_id_uindex",
        unique: true,
        fields: [
          { name: "city_id" },
        ]
      },
      {
        name: "city_pk",
        unique: true,
        fields: [
          { name: "city_id" },
        ]
      },
    ]
  });
};

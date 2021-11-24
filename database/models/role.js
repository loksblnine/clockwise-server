module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role', {
    role_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'role',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "role_pk",
        unique: true,
        fields: [
          { name: "role_id" },
        ]
      },
      {
        name: "role_role_id_uindex",
        unique: true,
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
};

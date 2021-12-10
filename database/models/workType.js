module.exports = function(sequelize, DataTypes) {
  return sequelize.define('workType', {
    work_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'workType',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "worktype_pk",
        unique: true,
        fields: [
          { name: "work_id" },
        ]
      },
      {
        name: "worktype_work_id_uindex",
        unique: true,
        fields: [
          { name: "work_id" },
        ]
      },
    ]
  });
};

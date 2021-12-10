module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master', {
    master_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      default: "nextval('master_master_id_seq'::regclass)"
    },
    master_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: /^[A-ZА-Яa-zа-я -]+$/i
      }
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i
      }
    },
    ranking: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  }, {
    sequelize,
    tableName: 'master',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "master_master_id_uindex",
        unique: true,
        fields: [
          { name: "master_id" },
        ]
      },
      {
        name: "master_pk",
        unique: true,
        fields: [
          { name: "master_id" },
        ]
      },
    ]
  });
};

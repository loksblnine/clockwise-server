module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      default: "nextval('user_user_id_seq'::regclass)"
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_email_password_uindex",
        unique: true,
        fields: [
          { name: "email" },
          { name: "password" },
        ]
      },
      {
        name: "user_pk",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_user_id_uindex",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};

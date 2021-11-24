module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    customer_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      default: "nextval('customer_customer_id_seq'::regclass)"
    },
    customer_name: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: /^[A-ZА-Яa-zа-я -]+$/i
      }
    },
    customer_email: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i
      }
    }
  }, {
    sequelize,
    tableName: 'customer',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "customer_customer_id_uindex",
        unique: true,
        fields: [
          { name: "customer_id" },
        ]
      },
      {
        name: "customer_pk",
        unique: true,
        fields: [
          { name: "customer_id" },
        ]
      },
    ]
  });
};

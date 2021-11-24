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
      allowNull: true
    },
    customer_email: {
      type: DataTypes.TEXT,
      allowNull: true
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

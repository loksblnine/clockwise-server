"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
class Customer extends sequelize_1.Model {
}
exports.Customer = Customer;
Customer.init({
    customer_id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    customer_name: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            is: /^[A-ZА-Яa-zа-я -]+$/i
        }
    },
    customer_email: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            is: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i
        }
    }
}, {
    tableName: 'customer',
    schema: 'public',
    timestamps: false,
    sequelize: config_1.sequelize,
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
//# sourceMappingURL=customer.js.map
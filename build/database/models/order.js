"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    order_id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    customer_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customer',
            key: 'customer_id'
        }
    },
    master_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'master',
            key: 'master_id'
        }
    },
    city_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'city',
            key: 'city_id'
        }
    },
    work_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'workType',
            key: 'work_id'
        }
    },
    order_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    isDone: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    mark: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize: config_1.sequelize,
    tableName: 'order',
    schema: 'public',
    timestamps: false,
    indexes: [
        {
            name: "order_master_id_city_id_order_time_uindex",
            unique: true,
            fields: [
                { name: "master_id" },
                { name: "city_id" },
                { name: "order_time" },
            ]
        },
        {
            name: "order_order_id_uindex",
            unique: true,
            fields: [
                { name: "order_id" },
            ]
        },
        {
            name: "order_pk",
            unique: true,
            fields: [
                { name: "order_id" },
            ]
        },
    ]
});
//# sourceMappingURL=order.js.map
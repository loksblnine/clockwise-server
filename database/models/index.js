const DataTypes = require("sequelize").DataTypes;
const _city = require("./city");
const _connect_city_master = require("./connect_city_master");
const _customer = require("./customer");
const _master = require("./master");
const _order = require("./order");
const _role = require("./role");
const _user = require("./user");
const _workType = require("./workType");

function models(sequelize) {
    const city = _city(sequelize, DataTypes);
    const connect_city_master = _connect_city_master(sequelize, DataTypes);
    const customer = _customer(sequelize, DataTypes);
    const master = _master(sequelize, DataTypes);
    const order = _order(sequelize, DataTypes);
    const role = _role(sequelize, DataTypes);
    const user = _user(sequelize, DataTypes);
    const workType = _workType(sequelize, DataTypes);

    connect_city_master.belongsTo(city, {as: "city", foreignKey: "city_id"});
    city.hasMany(connect_city_master, {as: "connect_city_masters", foreignKey: "city_id"});
    order.belongsTo(city, {as: "city", foreignKey: "city_id"});
    city.hasMany(order, {as: "orders", foreignKey: "city_id"});
    order.belongsTo(customer, {as: "customer", foreignKey: "customer_id"});
    customer.hasMany(order, {as: "orders", foreignKey: "customer_id"});
    connect_city_master.belongsTo(master, {as: "master", foreignKey: "master_id"});
    master.hasMany(connect_city_master, {as: "connect_city_masters", foreignKey: "master_id"});
    order.belongsTo(master, {as: "master", foreignKey: "master_id"});
    master.hasMany(order, {as: "orders", foreignKey: "master_id"});
    order.belongsTo(workType, {as: "work", foreignKey: "work_id"});
    workType.hasMany(order, {as: "orders", foreignKey: "work_id"});

    return {
        city,
        connect_city_master,
        customer,
        master,
        order,
        role,
        user,
        workType,
    };
}

module.exports = models;
module.exports.initModels = models;
module.exports.default = models;

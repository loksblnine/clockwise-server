"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = exports.Type = exports.User = exports.Role = exports.Master = exports.Order = exports.CityToMaster = exports.Customer = exports.City = void 0;
const order_1 = require("./order");
Object.defineProperty(exports, "Order", { enumerable: true, get: function () { return order_1.Order; } });
const customer_1 = require("./customer");
Object.defineProperty(exports, "Customer", { enumerable: true, get: function () { return customer_1.Customer; } });
const city_1 = require("./city");
Object.defineProperty(exports, "City", { enumerable: true, get: function () { return city_1.City; } });
const master_1 = require("./master");
Object.defineProperty(exports, "Master", { enumerable: true, get: function () { return master_1.Master; } });
const cityToMaster_1 = require("./cityToMaster");
Object.defineProperty(exports, "CityToMaster", { enumerable: true, get: function () { return cityToMaster_1.CityToMaster; } });
const photo_1 = require("./photo");
Object.defineProperty(exports, "Photo", { enumerable: true, get: function () { return photo_1.Photo; } });
const workType_1 = require("./workType");
Object.defineProperty(exports, "Type", { enumerable: true, get: function () { return workType_1.Type; } });
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const role_1 = require("./role");
Object.defineProperty(exports, "Role", { enumerable: true, get: function () { return role_1.Role; } });
city_1.City.hasMany(cityToMaster_1.CityToMaster, { as: "connect_city_masters", foreignKey: "city_id" });
city_1.City.hasMany(order_1.Order, { as: "orders", foreignKey: "city_id" });
customer_1.Customer.hasMany(order_1.Order, { as: "orders", foreignKey: "customer_id" });
order_1.Order.belongsTo(city_1.City, { as: "city", foreignKey: "city_id" });
order_1.Order.belongsTo(customer_1.Customer, { as: "customer", foreignKey: "customer_id" });
order_1.Order.belongsTo(master_1.Master, { as: "master", foreignKey: "master_id" });
order_1.Order.belongsTo(workType_1.Type, { as: "work", foreignKey: "work_id" });
order_1.Order.hasMany(photo_1.Photo, { as: "orders", foreignKey: "order_id" });
cityToMaster_1.CityToMaster.removeAttribute('id');
master_1.Master.belongsToMany(city_1.City, { through: cityToMaster_1.CityToMaster, as: "city", foreignKey: "city_id" });
city_1.City.belongsToMany(master_1.Master, { through: cityToMaster_1.CityToMaster, as: "master", foreignKey: "master_id" });
master_1.Master.hasMany(cityToMaster_1.CityToMaster, { as: "connect_city_master", foreignKey: "master_id" });
master_1.Master.hasMany(order_1.Order, { as: "orders", foreignKey: "master_id" });
photo_1.Photo.removeAttribute('id');
photo_1.Photo.belongsTo(order_1.Order, { as: "photo", foreignKey: "order_id" });
workType_1.Type.hasMany(order_1.Order, { as: "orders", foreignKey: "work_id" });
//# sourceMappingURL=index.js.map
import {Order} from "./order";
import {Customer} from "./customer";
import {City} from "./city";
import {Master} from "./master";
import {CityToMaster} from "./cityToMaster";
import {Photo} from "./photo";
import {Type} from "./workType";
import {User} from "./user";
import {Role} from "./role";

City.hasMany(CityToMaster, {as: "connect_city_masters", foreignKey: "city_id"});
City.hasMany(Order, {as: "orders", foreignKey: "city_id"});
Customer.hasMany(Order, {as: "orders", foreignKey: "customer_id"});
Order.belongsTo(City, {as: "city", foreignKey: "city_id"});
Order.belongsTo(Customer, {as: "customer", foreignKey: "customer_id"});
Order.belongsTo(Master, {as: "master", foreignKey: "master_id"});
Order.belongsTo(Type, {as: "work", foreignKey: "work_id"});
Order.hasMany(Photo, {as: "orders", foreignKey: "order_id"});
CityToMaster.removeAttribute('id');
CityToMaster.belongsTo(City, {as: "city", foreignKey: "city_id"});
CityToMaster.belongsTo(Master, {as: "master", foreignKey: "master_id"});
Master.hasMany(CityToMaster, {as: "connect_city_master", foreignKey: "master_id"});
Master.hasMany(Order, {as: "orders", foreignKey: "master_id"});
Photo.removeAttribute('id');
Photo.belongsTo(Order, {as: "photo", foreignKey: "order_id"});
Type.hasMany(Order, {as: "orders", foreignKey: "work_id"});

export {
    City,
    Customer,
    CityToMaster,
    Order,
    Master,
    Role,
    User,
    Type,
    Photo
}

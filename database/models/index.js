require("dotenv").config();
const citiesModel = require('./City')
const customersModel = require('./Customer')
const mastersModel = require('./Master')
const ordersModel = require('./Order')
const workTypeModel = require('./workType')
const usersModel = require('./User')
const rolesModel = require('./Role')
const connectionModel = require('./connect_city_master')

module.exports = {
    mastersModel,
    customersModel,
    citiesModel,
    ordersModel,
    workTypeModel,
    usersModel,
    rolesModel,
    connectionModel
}
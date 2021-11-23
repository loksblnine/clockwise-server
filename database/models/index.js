require("dotenv").config();
const Sequelize = require('sequelize')
const citiesModel = require('./cities')
const customersModel = require('./customers')
const mastersModel = require('./masters')
const ordersModel = require('./orders')
const workTypeModel = require('./work_type')
const usersModel = require('./users')
const rolesModel = require('./roles')
const connectionModel = require('./connect_city_master')

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
});

sequelize.sync({force: true})
    .then(() => {
        console.log(`Database & tables created!`)
    })

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
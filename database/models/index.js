require("dotenv").config();
const Sequelize = require('sequelize')
const citiesModel = require('./City')
const customersModel = require('./Customer')
const mastersModel = require('./Master')
const ordersModel = require('./Order')
const workTypeModel = require('./workType')
const usersModel = require('./User')
const rolesModel = require('./Role')
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
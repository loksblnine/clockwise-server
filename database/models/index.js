const db = require('../config/config');

const citiesModel = require('./City')
const customersModel = require('./Customer')
const mastersModel = require('./Master')
const ordersModel = require('./Order')
const workTypeModel = require('./workType')
const usersModel = require('./User')
const rolesModel = require('./Role')
const connectionModel = require('./connect_city_master')

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

db.City = citiesModel
db.Customer = customersModel
db.Master = mastersModel
db.Order = ordersModel
db.workTypeModel = workTypeModel
db.User = usersModel
db.Role = rolesModel
db.connectionModel = connectionModel

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db
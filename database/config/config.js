const Sequelize = require('sequelize');
require('dotenv').config()

const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    // dialectOptions: {
    //     ssl: {
    //         require: true, // This will help you. But you will see nwe error
    //         rejectUnauthorized: false // This line will fix new error
    //     }
    // },
});

module.exports = db
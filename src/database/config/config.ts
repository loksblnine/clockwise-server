import {Sequelize} from "sequelize";

export const sequelize = new Sequelize(String(process.env.DB_DATABASE), String(process.env.DB_USER), String(process.env.DB_PASSWORD), {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
})

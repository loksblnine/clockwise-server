"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const db_database = process.env.NODE_ENV === "test" ? String(process.env.TEST_DB_DATABASE) : String(process.env.DB_DATABASE);
const db_password = process.env.NODE_ENV === "test" ? String(process.env.TEST_DB_PASSWORD) : String(process.env.DB_PASSWORD);
const db_user = process.env.NODE_ENV === "test" ? String(process.env.TEST_DB_USER) : String(process.env.DB_USER);
const db_host = process.env.NODE_ENV === "test" ? String(process.env.TEST_DB_HOST) : String(process.env.DB_HOST);
const dialectOptions = process.env.NODE_ENV === "development" ? {} : {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
};
exports.sequelize = new sequelize_1.Sequelize(db_database, db_user, db_password, {
    host: db_host,
    dialect: 'postgres',
    dialectOptions
});
//# sourceMappingURL=config.js.map
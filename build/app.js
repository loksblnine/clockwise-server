"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const logger_1 = require("./utils/logger");
const config_2 = require("./database/config/config");
const router_1 = __importDefault(require("./routes/router"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json({ limit: '7mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(express_1.default.static("static"));
app.use("/", router_1.default);
try {
    config_2.sequelize.authenticate();
    logger_1.logger.info('Connection has been established successfully.');
}
catch (error) {
    logger_1.logger.error('Unable to connect to the database:', error);
}
app.listen(config_1.config.port, function () {
    logger_1.logger.info(`server listening on port: ${config_1.config.port}`);
});
//# sourceMappingURL=app.js.map
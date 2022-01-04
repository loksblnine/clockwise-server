"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const config_1 = require("../config");
const winston_1 = require("winston");
const { combine, timestamp, printf } = winston_1.format;
const loggerFormat = printf((info) => {
    return `${info.timestamp} | ${info.level}: ${info.message}`;
});
exports.logger = winston_1.createLogger({
    level: config_1.config.loggerLevel,
    format: combine(winston_1.format.colorize(), timestamp(), loggerFormat),
    transports: [new winston_1.transports.Console()],
});
//# sourceMappingURL=logger.js.map
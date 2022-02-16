"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDaysArray = exports.whereConstructor = exports.sendMail = exports.LINK = exports.generateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const sequelize_1 = require("sequelize");
mail_1.default.setApiKey(String(process.env.SG_API_KEY));
const generateJwt = (id, email, role, time) => {
    return jsonwebtoken_1.default.sign({ id, email, role }, String(process.env.SECRET_KEY), {
        expiresIn: time,
    });
};
exports.generateJwt = generateJwt;
exports.LINK = process.env.NODE_ENV === "production" ? (process.env.PROD_FRONT_URL) : (process.env.DEV_FRONT_URL);
const sendMail = (message, response) => {
    mail_1.default
        .send(message)
        .then(() => {
        response.status(201).json("Success!");
    })
        .catch(() => {
        response.status(500).json("Something went wrong");
    });
};
exports.sendMail = sendMail;
const whereConstructor = (request) => {
    const where = {};
    if (request?.query?.city_id?.length) {
        where.city_id = Number(request.query.city_id);
    }
    if (request?.query?.master_id?.length) {
        where.master_id = Number(request.query.master_id);
    }
    if (request?.query?.isDone?.length) {
        where.isDone = request.query.isDone === "true";
    }
    if (request?.query?.work_id?.length) {
        where.work_id = Number(request.query.work_id);
    }
    if (request?.query?.from?.length && !request?.query?.to?.length) {
        where.order_time = { [sequelize_1.Op.gte]: request.query.from };
    }
    if (request?.query?.to?.length && !request?.query?.from?.length) {
        const to = new Date(String(request.query.to));
        to.setDate(to.getDate() + 1);
        where.order_time = { [sequelize_1.Op.lte]: to };
    }
    if (request?.query?.to?.length && request?.query?.from?.length) {
        const from = new Date(String(request.query.from));
        const to = new Date(String(request.query.to));
        to.setDate(to.getDate() + 1);
        where.order_time = { [sequelize_1.Op.between]: [from, to] };
    }
    return where;
};
exports.whereConstructor = whereConstructor;
const getDaysArray = (from, to) => {
    const a = [];
    for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
        a.push(new Date(d).toLocaleDateString());
    }
    return a;
};
exports.getDaysArray = getDaysArray;
//# sourceMappingURL=utils.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.LINK = exports.generateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
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
        .catch((e) => {
        response.status(500).json("Something went wrong");
    });
};
exports.sendMail = sendMail;
//# sourceMappingURL=utils.js.map
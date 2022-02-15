"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmRegistrationMail = exports.sendConfirmOrderMail = void 0;
const utils_1 = require("../utils/utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const sendConfirmOrderMail = async (request, response) => {
    try {
        const time = new Date(request.body.order_time);
        const hourBefore = new Date(time.getFullYear(), time.getMonth(), time.getDate(), (time.getHours() - 3), time.getMinutes());
        node_schedule_1.default.scheduleJob(hourBefore, () => {
            const msg = {
                to: String(request.body.email),
                from: { name: "Clockwise Clockware", email: String(process.env.USER) },
                templateId: String(process.env.SG_TEMPLATE_ID_REMEMBER),
                dynamicTemplateData: {
                    message: request.body.message,
                }
            };
            utils_1.sendMail(msg, response);
        });
        const msg = {
            to: String(request.body.email),
            from: { name: "Clockwise Clockware", email: String(process.env.USER) },
            templateId: String(process.env.SG_TEMPLATE_ID_CONFIRM_ORDER),
            dynamicTemplateData: {
                message: request.body.message,
                link: `${process.env.FRONT_URL}/pay?order_id=${request.body.order_id}&type=${request.body.type}`
            }
        };
        utils_1.sendMail(msg, response);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.sendConfirmOrderMail = sendConfirmOrderMail;
const sendConfirmRegistrationMail = async (request, response) => {
    try {
        const email = request?.body?.email;
        if (email) {
            const token = jsonwebtoken_1.default.sign({ activated: email }, String(process.env.SECRET_KEY), {
                expiresIn: "900s",
            });
            const LINK_WITH_TOKEN = utils_1.LINK + '/activate/' + token;
            const msg = {
                to: email,
                from: String(process.env.USER),
                templateId: String(process.env.SG_TEMPLATE_ID_CONFIRM_REGISTRATION),
                dynamicTemplateData: {
                    link: LINK_WITH_TOKEN
                }
            };
            utils_1.sendMail(msg, response);
        }
        else {
            response.status(500).json("Something went wrong");
        }
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.sendConfirmRegistrationMail = sendConfirmRegistrationMail;
//# sourceMappingURL=sendMailController.js.map
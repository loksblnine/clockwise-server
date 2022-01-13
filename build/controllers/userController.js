"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMarkOrder = exports.approveOrder = exports.approveUser = exports.approveMaster = exports.loginUser = exports.registerUser = exports.isTokenValidGoogle = exports.isTokenValid = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../database/models");
const utils_1 = require("../utils/utils");
const isTokenValid = async (request, response) => {
    const token = utils_1.generateJwt(request.body.user.id, request.body.user.email, request.body.user.role, "2h");
    response.status(200).json({ token });
};
exports.isTokenValid = isTokenValid;
const isTokenValidGoogle = async (request, response) => {
    const user = await models_1.User.findOne({
        where: {
            email: request.user.email,
            role: 3
        },
        raw: true
    });
    if (user) {
        const token = utils_1.generateJwt(user.user_id, user.email, user.role, "2h");
        response.redirect(`${process.env.FRONT_URL}/login/token/${token}`);
    }
    else {
        response.redirect(`${process.env.FRONT_URL}/login`);
    }
};
exports.isTokenValidGoogle = isTokenValidGoogle;
const registerUser = async (request, response) => {
    try {
        const email = request.body.email, password = request.body.password, role = request.body;
        if (!(email && password)) {
            response.status(400).send("Invalid credentials");
        }
        const encryptedPassword = await bcrypt_1.default.hash(password, 5);
        const newUser = await models_1.User.create({
            email, password: encryptedPassword, role
        });
        const token = utils_1.generateJwt(newUser.user_id, email, role, "2h");
        switch (role) {
            case 1: {
                break;
            }
            case 2: {
                await models_1.Master.findCreateFind({
                    where: {
                        email
                    },
                    defaults: {
                        master_name: "Inactive Master", email, ranking: "5"
                    }
                });
                break;
            }
            case 3: {
                await models_1.Customer.findCreateFind({
                    where: { customer_email: email },
                    defaults: {
                        customer_name: "Inactive Customer", customer_email: email
                    }
                });
                break;
            }
            default: {
                break;
            }
        }
        response.status(201).json({ token });
    }
    catch (err) {
        response.status(500).json("Something went wrong");
    }
};
exports.registerUser = registerUser;
const loginUser = async (request, response) => {
    try {
        const email = request.body.email, password = request.body.password;
        if (!(email && password)) {
            response.status(401).send("All input is required");
        }
        const oldUsers = await models_1.User.findAll({
            where: {
                email, isActive: true
            },
            raw: true
        });
        for (let i = 0; i < oldUsers?.length; i++) {
            const passwordMatch = await bcrypt_1.default.compare(password, oldUsers[i]?.password);
            if (passwordMatch) {
                const token = utils_1.generateJwt(oldUsers[i].user_id, oldUsers[i].email, oldUsers[i].role, "2h");
                return response.status(200).json({ token });
            }
        }
        return response.status(500).send("Something went wrong");
    }
    catch (err) {
        return response.status(500).send("Something went wrong");
    }
};
exports.loginUser = loginUser;
const approveMaster = async (request, response) => {
    try {
        const id = request.params.id;
        const active = Boolean(request.query.active === "true");
        await models_1.Master.update({
            isApproved: active
        }, {
            where: { master_id: id }
        });
        const master = await models_1.Master.findOne({
            where: {
                master_id: id
            }
        });
        if (master && process.env.USER && process.env.SG_TEMPLATE_ID_ACCOUNT_APPROVE) {
            const msg = {
                to: String(master?.email),
                from: { name: "Clockwise Clockware", email: String(process.env.USER) },
                templateId: String(process.env.SG_TEMPLATE_ID_ACCOUNT_APPROVE),
                dynamicTemplateData: {
                    link: utils_1.LINK
                }
            };
            utils_1.sendMail(msg, response);
        }
        else {
            response.status(500).send("Something went wrong");
        }
    }
    catch (e) {
        response.status(500).send("Something went wrong");
    }
};
exports.approveMaster = approveMaster;
const approveUser = async (request, response) => {
    try {
        const token = String(request?.headers?.authorization?.split(' ')[1]);
        if (!token) {
            response.status(401).json({ message: "Не авторизован" });
        }
        const activated = jsonwebtoken_1.default.verify(token, String(process.env.SECRET_KEY));
        await models_1.User.update({
            isActive: true
        }, {
            where: { email: activated }
        });
        const user = await models_1.User.findOne({
            where: {
                email: activated
            }
        });
        if (user) {
            const newToken = utils_1.generateJwt(user.user_id, user.email, user.role, "2h");
            response.status(201).json({ token: newToken });
        }
        response.status(500).send("Something went wrong");
    }
    catch (e) {
        response.status(500).send("Something went wrong");
    }
};
exports.approveUser = approveUser;
const approveOrder = async (request, response) => {
    try {
        const id = request.params.id;
        await models_1.Order.update({
            isDone: true
        }, {
            where: {
                order_id: id
            },
        });
        const order = await models_1.Order.findOne({
            where: {
                order_id: id
            },
            raw: true
        });
        if (order) {
            const customer = await models_1.Customer.findOne({
                where: {
                    customer_id: order.customer_id
                },
                raw: true
            });
            const master = await models_1.Master.findOne({
                where: {
                    master_id: order.master_id
                }
            });
            if (customer && master && process.env.USER && process.env.SG_TEMPLATE_ID_FINISH_ORDER) {
                const msg = {
                    to: String(customer.customer_email),
                    from: String(process.env.USER),
                    templateId: String(process.env.SG_TEMPLATE_ID_FINISH_ORDER),
                    dynamicTemplateData: {
                        master_name: master.master_name,
                        order_id: id,
                        link: utils_1.LINK
                    }
                };
                utils_1.sendMail(msg, response);
            }
            else {
                response.status(500).send("Something went wrong");
            }
        }
        else {
            response.status(500).send("Something went wrong");
        }
    }
    catch (e) {
        response.status(500).send("Something went wrong");
    }
};
exports.approveOrder = approveOrder;
const setMarkOrder = async (request, response) => {
    try {
        const id = request.params.id;
        const mark = Number(request.body.mark);
        await models_1.Order.update({
            mark
        }, {
            where: { order_id: id }
        });
        response.status(201).json("Success");
    }
    catch (e) {
        response.status(500).send("Something went wrong");
    }
};
exports.setMarkOrder = setMarkOrder;
//# sourceMappingURL=userController.js.map
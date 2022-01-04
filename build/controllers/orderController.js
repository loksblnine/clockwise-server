"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerOrders = exports.getMasterOrders = exports.getOrderById = exports.getOrders = exports.deleteOrder = exports.updateOrder = exports.createOrder = void 0;
const models_1 = require("../database/models");
const sequelize_1 = require("sequelize");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const createOrder = async (request, response) => {
    try {
        const customer = await models_1.Customer.findCreateFind({
            where: {
                customer_email: request.body.customer_email
            },
            defaults: {
                customer_name: request.body.customer_name,
                customer_email: request.body.customer_email
            },
            raw: true
        });
        const order = await models_1.Order.create({ ...request.body, customer_id: customer[0].customer_id });
        const fileStr = request.body?.data;
        for (let i = 0; i < fileStr?.length; i++) {
            const uploadResponse = await cloudinary_1.default.uploader.upload(fileStr[i], {
                folder: `order_photos/order${order.order_id}`
            });
            await models_1.Photo.create({ order_id: order.order_id, photo_url: uploadResponse.secure_url });
        }
        response.status(201).json(order);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.createOrder = createOrder;
const updateOrder = async (request, response) => {
    try {
        const id = request.params.id;
        const { customer_id, master_id, city_id, work_id, order_time } = request.body;
        await models_1.Order.update({
            customer_id, master_id, city_id, work_id, order_time
        }, {
            where: {
                order_id: id
            }
        });
        const order = await models_1.Order.findOne({
            where: {
                order_id: id
            },
            attributes: ['order_id', 'order_time', 'master_id', 'city_id', 'customer_id', 'isDone', 'work_id'],
            include: [{
                    model: models_1.Master,
                    as: "master",
                    attributes: ['master_name']
                }, {
                    model: models_1.City,
                    as: 'city',
                    attributes: ['city_name']
                }, {
                    model: models_1.Customer,
                    as: 'customer',
                    attributes: ['customer_name']
                },
            ]
        });
        response.status(201).json(order);
    }
    catch (err) {
        response.status(500).json("Something went wrong");
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (request, response) => {
    try {
        const id = request.params.id;
        await models_1.Order.destroy({
            where: {
                order_id: id
            }
        });
        response.status(201).json(`Order ${id} was removed successfully`);
    }
    catch (err) {
        response.status(500).json("Something went wrong");
    }
};
exports.deleteOrder = deleteOrder;
const getOrders = async (request, response) => {
    try {
        const page = request.params.page;
        const offset = 10 * Number(page);
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
            where.order_time = { [sequelize_1.Op.lte]: request.query.to };
        }
        if (request?.query?.to?.length && request?.query?.from?.length) {
            where.order_time = { [sequelize_1.Op.between]: [request.query.from, request.query.to] };
        }
        const orders = await models_1.Order.findAndCountAll({
            order: [
                ['order_time', 'DESC'],
                ['order_id', 'ASC'],
            ],
            attributes: ['order_id', 'order_time', 'master_id', 'city_id', 'customer_id', 'isDone', 'work_id'],
            include: [{
                    model: models_1.Master,
                    as: "master",
                    attributes: ['master_name']
                }, {
                    model: models_1.City,
                    as: 'city',
                    attributes: ['city_name']
                }, {
                    model: models_1.Customer,
                    as: 'customer',
                    attributes: ['customer_name']
                },
            ],
            where,
            offset,
            limit: 10
        });
        response.status(201).json(orders.rows);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getOrders = getOrders;
const getOrderById = async (request, response) => {
    try {
        const { id } = request.params;
        const order = models_1.Order.findOne({
            where: {
                order_id: id
            },
            attributes: ['order_id', 'order_time', 'master_id', 'city_id', 'customer_id', 'isDone', 'work_id'],
            include: [{
                    model: models_1.Master,
                    as: "master",
                    attributes: ['master_name']
                }, {
                    model: models_1.City,
                    as: 'city',
                    attributes: ['city_name']
                }, {
                    model: models_1.Customer,
                    as: 'customer',
                    attributes: ['customer_name']
                },
            ],
        });
        response.status(201).json(order);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getOrderById = getOrderById;
const getMasterOrders = async (request, response) => {
    try {
        const page = request.params.page;
        const id = request.params.id;
        const offset = 10 * Number(page);
        const orders = await models_1.Order.findAndCountAll({
            order: [
                ['order_time', 'DESC'],
                ['order_id', 'ASC'],
            ],
            include: [{
                    model: models_1.City,
                    as: 'city',
                    attributes: ['city_name']
                }, {
                    model: models_1.Customer,
                    as: 'customer',
                    attributes: ['customer_name']
                },
            ],
            where: {
                master_id: id
            },
            offset,
            limit: 10
        });
        response.status(201).json(orders.rows);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getMasterOrders = getMasterOrders;
const getCustomerOrders = async (request, response) => {
    try {
        const page = request.params.page;
        const id = request.params.id;
        const offset = 10 * Number(page);
        const orders = await models_1.Order.findAll({
            order: [
                ['order_time', 'DESC'],
                ['order_id', 'ASC'],
            ],
            include: [{
                    model: models_1.City,
                    as: 'city',
                    attributes: ['city_name']
                }, {
                    model: models_1.Master,
                    as: 'master',
                    attributes: ['master_name']
                },
            ],
            where: {
                customer_id: id
            },
            offset,
            limit: 10
        });
        response.status(201).json(orders);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getCustomerOrders = getCustomerOrders;
//# sourceMappingURL=orderController.js.map
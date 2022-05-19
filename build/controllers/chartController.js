"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagramOrderTableByMaster = exports.diagramOrdersByMaster = exports.diagramOrdersByCity = exports.diagramByDays = void 0;
const models_1 = require("../database/models");
const utils_1 = require("../utils/utils");
const sequelize_1 = require("sequelize");
const diagramByDays = async (request, response) => {
    try {
        const from = String(request.query.from);
        const to = String(request.query.to);
        if (from && to) {
            const where = (0, utils_1.whereConstructor)(request);
            const orders = await models_1.Order.findAll({
                where
            });
            const days = (0, utils_1.getDaysArray)(from, new Date(to));
            const respData = days.map(d => {
                return {
                    "date": d,
                    "Количество": orders.filter(o => o.order_time.toLocaleDateString() === d).length
                };
            });
            response.status(201).json(respData);
        }
        else {
            response.status(500).json("Something went wrong");
        }
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.diagramByDays = diagramByDays;
const diagramOrdersByCity = async (request, response) => {
    try {
        const from = String(request.query.from);
        const to = String(request.query.to);
        if (from && to) {
            const where = (0, utils_1.whereConstructor)(request);
            const orders = await models_1.Order.findAll({
                where,
                include: [{
                        model: models_1.City,
                        as: 'city',
                        attributes: ['city_name']
                    }],
                raw: true
            });
            const counts = orders.map(d => d["city.city_name"]).reduce((map, val) => {
                map[val] = (map[val] || 0) + 1;
                return map;
            }, {});
            const respData = [];
            let i = 0, sum = 0;
            for (const [key, value] of Object.entries(counts).sort((a, b) => {
                return b[1] - a[1];
            })) {
                if (i < 3) {
                    respData.push({
                        name: key,
                        value
                    });
                }
                else {
                    sum += Number(value);
                }
                i++;
            }
            respData.push({
                name: "Другое",
                value: sum
            });
            response.status(201).json(respData);
        }
        else {
            response.status(500).json("Something went wrong");
        }
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.diagramOrdersByCity = diagramOrdersByCity;
const diagramOrdersByMaster = async (request, response) => {
    try {
        const from = String(request.query.from);
        const to = String(request.query.to);
        if (from && to) {
            const where = (0, utils_1.whereConstructor)(request);
            const orders = await models_1.Order.findAll({
                where,
                include: [{
                        model: models_1.Master,
                        as: 'master',
                        attributes: ['master_name']
                    }],
                raw: true
            });
            const counts = orders.map(d => d.master_id).reduce((map, val) => {
                map[val] = (map[val] || 0) + 1;
                return map;
            }, {});
            const respData = [];
            let i = 0, sum = 0;
            for (const [key, value] of Object.entries(counts).sort((a, b) => {
                return b[1] - a[1];
            })) {
                if (i < 3) {
                    const master = await models_1.Master.findOne({
                        where: {
                            master_id: key
                        },
                        raw: true
                    });
                    respData.push({
                        id: key,
                        name: master?.master_name,
                        value
                    });
                }
                else {
                    sum += Number(value);
                }
                i++;
            }
            respData.push({
                name: "Другое",
                value: sum
            });
            response.status(201).json(respData);
        }
        else {
            response.status(500).json("Something went wrong");
        }
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.diagramOrdersByMaster = diagramOrdersByMaster;
const diagramOrderTableByMaster = async (request, response) => {
    try {
        const from = String(request.query.from);
        const to = String(request.query.to);
        const masterIds = request.query.master_array;
        let respData = [];
        const works = await models_1.Type.findAll();
        for (let masterId of masterIds) {
            const master_id = String(masterId);
            const where = {};
            if (from && to && master_id) {
                where.order_time = { [sequelize_1.Op.between]: [request.query.from, request.query.to] };
                where.master_id = Number(master_id);
                const orders = await models_1.Order.findAll({
                    where: {
                        master_id
                    },
                    raw: true
                });
                const master = await models_1.Master.findOne({
                    where: {
                        master_id
                    }
                });
                const sum1 = Number(orders.filter(o => o.work_id === 1 && o.isPaid).length) * Number(works?.find(w => w.work_id === 1)?.price);
                const sum2 = Number(orders.filter(o => o.work_id === 2 && o.isPaid).length) * Number(works?.find(w => w.work_id === 2)?.price);
                const sum3 = Number(orders.filter(o => o.work_id === 3 && o.isPaid).length) * Number(works?.find(w => w.work_id === 3)?.price);
                if (master?.master_name)
                    respData.push({
                        "Мастер": master?.master_name,
                        "Заработал USD": sum1 + sum2 + sum3,
                        "Количество": orders.length,
                        "Завершенные": orders.filter(o => o.isDone).length,
                        "Ждут выполнения": orders.filter(o => !o.isDone).length,
                        "Маленькие часы": orders.filter(o => o.work_id === 1).length,
                        "Средние часы": orders.filter(o => o.work_id === 2).length,
                        "Большие часы": orders.filter(o => o.work_id === 3).length,
                        "Рейтинг": master?.ranking
                    });
                else {
                    response.status(201).json(respData);
                }
            }
            else {
                response.status(500).json("Something went wrong");
            }
        }
        response.status(201).json(respData);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.diagramOrderTableByMaster = diagramOrderTableByMaster;
//# sourceMappingURL=chartController.js.map
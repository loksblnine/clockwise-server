"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMasterByEmail = exports.deleteMaster = exports.updateMaster = exports.getFreeMasters = exports.getMasterById = exports.getMasters = exports.createMaster = void 0;
const models_1 = require("../database/models");
const sequelize_1 = require("sequelize");
const createMaster = async (request, response) => {
    try {
        const master = await models_1.Master.create(request.body);
        response.status(201).json(master);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.createMaster = createMaster;
const getMasters = async (request, response) => {
    try {
        const where = {};
        if (request?.query?.name?.length) {
            where.master_name = { [sequelize_1.Op.iLike]: `%${request.query.name}%` };
        }
        const page = request.params.page;
        const offset = 10 * Number(page);
        const masters = await models_1.Master.findAll({
            order: [
                ["master_id", "ASC"]
            ],
            where,
            offset,
            limit: 10,
            raw: true
        });
        const deps = await models_1.CityToMaster.findAll({
            raw: true
        });
        response.status(201).json(masters.map((master) => {
            return {
                ...master,
                deps: deps.filter((d) => d.master_id === master.master_id).map((d) => d.city_id)
            };
        }));
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getMasters = getMasters;
const getMasterById = async (request, response) => {
    try {
        const id = request.params.id;
        const master = await models_1.Master.findOne({
            where: {
                master_id: id
            }
        });
        response.status(201).json(master);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getMasterById = getMasterById;
const getFreeMasters = async (request, response) => {
    try {
        const { city_id, order_time, work_id } = request.body;
        if (city_id && order_time && work_id) {
            const startDate = new Date(order_time);
            const startHour = startDate.getHours();
            const finishHour = Number(work_id) + startHour;
            const endDate = new Date(order_time).setHours(finishHour);
            const deps = await models_1.CityToMaster.findAll({
                attributes: ['city_id', 'master_id'],
                where: {
                    city_id: city_id,
                },
                raw: true
            });
            const masters = [];
            for (const dep of deps) {
                const orders = await models_1.Order.findAll({
                    where: {
                        master_id: dep.master_id,
                        order_time: {
                            [sequelize_1.Op.between]: [startDate, endDate]
                        }
                    },
                    raw: true
                });
                if (!orders.length)
                    masters.push(await models_1.Master.findOne({
                        where: {
                            master_id: dep.master_id
                        },
                        attributes: ['master_id', 'master_name', 'ranking']
                    }));
            }
            response.status(201).json(masters);
        }
        else {
            response.status(500).json("Something went wrong");
        }
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getFreeMasters = getFreeMasters;
const updateMaster = async (request, response) => {
    try {
        const id = request.params.id;
        const master_name = request.body.master_name, email = request.body.email, ranking = request.body.ranking;
        await models_1.Master.update({
            master_name, email, ranking
        }, {
            where: { master_id: id }
        });
        const master = await models_1.Master.findOne({
            where: {
                master_id: id
            },
            raw: true
        });
        const deps = await models_1.CityToMaster.findAll({
            where: {
                master_id: id
            },
            raw: true
        });
        response.status(201).json({ ...master, deps: deps?.map((d) => d.city_id) });
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.updateMaster = updateMaster;
const deleteMaster = async (request, response) => {
    try {
        const { id } = request.params;
        await models_1.Master.destroy({
            where: {
                master_id: id
            }
        });
        response.status(201).json(`Master ${id} was removed successfully`);
    }
    catch (err) {
        response.status(500).json("Something went wrong");
    }
};
exports.deleteMaster = deleteMaster;
const getMasterByEmail = async (request, response) => {
    try {
        const master = await models_1.Master.findCreateFind({
            where: { email: request.params.email },
            defaults: {
                master_name: "Inactive Master",
                email: request.params.email,
                ranking: "5"
            },
        });
        const deps = await models_1.CityToMaster.findAll({
            where: {
                master_id: master[0].master_id
            },
            raw: true
        });
        response.status(201).json({ master: master[0], deps: deps.map((d) => d.city_id) });
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getMasterByEmail = getMasterByEmail;
//# sourceMappingURL=masterController.js.map
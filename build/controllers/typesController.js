"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateType = exports.deleteTypeById = exports.getAllTypes = exports.createType = void 0;
const models_1 = require("../database/models");
const createType = async (request, response) => {
    try {
        const type = await models_1.Type.create(request.body);
        response.status(201).json(type);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.createType = createType;
const getAllTypes = async (request, response) => {
    try {
        const types = await models_1.Type.findAll({
            order: [
                ["work_id", "ASC"]
            ]
        });
        response.status(201).json(types);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getAllTypes = getAllTypes;
const deleteTypeById = async (request, response) => {
    try {
        const id = request.params.id;
        await models_1.Type.destroy({
            where: {
                work_id: id
            }
        });
        response.status(201).json(`Type ${id} was removed successfully`);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.deleteTypeById = deleteTypeById;
const updateType = async (request, response) => {
    try {
        const id = request.params.id;
        const time = request.body.time, price = request.body.price, description = request.body.description;
        await models_1.Type.update({
            description, time, price
        }, {
            where: { work_id: id }
        });
        const type = await models_1.Type.findOne({
            where: {
                work_id: id
            }
        });
        response.status(201).json(type);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.updateType = updateType;
//# sourceMappingURL=typesController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDependency = exports.getCityMasters = exports.getMasterCities = exports.getAllDeps = exports.createDependency = void 0;
const models_1 = require("../database/models");
const createDependency = async (request, response) => {
    try {
        const connect = await models_1.CityToMaster.create(request.body);
        response.status(201).json(connect);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.createDependency = createDependency;
const getAllDeps = async (request, response) => {
    try {
        const deps = await models_1.CityToMaster.findAll();
        response.status(201).json(deps);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getAllDeps = getAllDeps;
const getMasterCities = async (request, response) => {
    try {
        const id = request.params.id;
        const deps = await models_1.CityToMaster.findAll({
            where: {
                master_id: id
            }
        });
        response.status(201).json(deps.map((r) => r.city_id));
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getMasterCities = getMasterCities;
const getCityMasters = async (request, response) => {
    try {
        const id = request.params.id;
        const deps = await models_1.CityToMaster.findAll({
            where: {
                city_id: id
            }
        });
        response.status(201).json(deps.map((r) => r.master_id));
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getCityMasters = getCityMasters;
const deleteDependency = async (request, response) => {
    try {
        const city_id = request.body.city_id, master_id = request.body.master_id;
        await models_1.CityToMaster.destroy({
            where: {
                city_id, master_id
            }
        });
        response.status(201).json("Success!");
    }
    catch (err) {
        response.status(500).json("Something went wrong");
    }
};
exports.deleteDependency = deleteDependency;
//# sourceMappingURL=depsController.js.map
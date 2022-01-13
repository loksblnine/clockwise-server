"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCity = exports.deleteCityById = exports.getCityById = exports.getAllCities = exports.createCity = void 0;
const models_1 = require("../database/models");
const createCity = async (request, response) => {
    try {
        const city = await models_1.City.create(request.body);
        response.status(201).json(city);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.createCity = createCity;
const getAllCities = async (request, response) => {
    try {
        const cities = await models_1.City.findAll({
            order: [
                ["city_id", "ASC"]
            ]
        });
        response.status(201).json(cities);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getAllCities = getAllCities;
const getCityById = async (request, response) => {
    try {
        const id = request.params.id;
        const city = await models_1.City.findOne({
            where: {
                city_id: id
            }
        });
        response.status(201).json(city);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getCityById = getCityById;
const deleteCityById = async (request, response) => {
    try {
        const id = request.params.id;
        await models_1.City.destroy({
            where: {
                city_id: id
            }
        });
        response.status(201).json(`City ${id} was removed successfully`);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.deleteCityById = deleteCityById;
const updateCity = async (request, response) => {
    try {
        const id = request.params.id;
        const city_name = request.body.city_name;
        await models_1.City.update({
            city_name
        }, {
            where: { city_id: id }
        });
        const city = await models_1.City.findOne({
            where: {
                city_id: id
            }
        });
        response.status(201).json(city);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.updateCity = updateCity;
//# sourceMappingURL=cityController.js.map
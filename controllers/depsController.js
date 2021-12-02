const models = require("../database/models");
const sequelize = require("../database/config/config");
const createDependency = async (request, response) => {
    try {
        const depcy = await models.initModels(sequelize).connect_city_master.create(
            request.body
        )
        return response.status(201).json(
            depcy
        )
    } catch
        (e) {
        response.json(e.toString())
    }
}
const getAllDeps = async (request, response) => {
    try {
        const deps = await models.initModels(sequelize).connect_city_master.findAll({
        })
        return response.status(201).json(
            deps
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
const getMasterCities = async (request, response) => {
    try {
        const {id} = request.params;
        const deps = await models.initModels(sequelize).connect_city_master.findAll({
            where: {
                master_id: id
            }
        })
        return response.status(201).json(
            deps.map(r => r.city_id)
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
const getCityMasters = async (request, response) => {
    try {
        const {id} = request.params;
        const deps = await models.initModels(sequelize).connect_city_master.findAll({
            where: {
                city_id: id
            }
        })
        return response.status(201).json(
            deps.map(r => r.master_id)
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
const deleteDependency = async (request, response) => {
    try {
        const {city_id, master_id} = request.body
        await models.initModels(sequelize).connect_city_master.destroy({
            where: {
                city_id, master_id
            }
        })
        response.status(201).json("Success!")
    } catch (err) {
        response.status(500).json("Something went wrong")
    }
}
module.exports = {
    getAllDeps,
    getMasterCities,
    getCityMasters,
    deleteDependency,
    createDependency
}
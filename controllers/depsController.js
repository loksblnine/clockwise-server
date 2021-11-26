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
            attributes:['city_id', 'master_id']
        })
        return response.status(201).json(
            deps
        )
    } catch
        (e) {
        response.json("Ошибка со стороны сервера")
    }
}
const getMasterCities = async (request, response) => {
    try {
        const {id} = request.params;
        const deps = await models.initModels(sequelize).connect_city_master.findAll({
            attributes:['city_id', 'master_id'],
            where: {
                master_id: id
            }
        })
        return response.status(201).json(
            deps.map(r => r.city_id)
        )
    } catch
        (e) {
        response.json("Ошибка со стороны сервера")
    }
}
const getCityMasters = async (request, response) => {
    try {
        const {id} = request.params;
        const deps = await models.initModels(sequelize).connect_city_master.findAll({
            attributes:['city_id', 'master_id'],
            where: {
                city_id: id
            }
        })
        return response.status(201).json(
            deps.map(r => r.master_id)
        )
    } catch
        (e) {
        response.json("Ошибка со стороны сервера")
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
        response.json("Город у мастера удален")
    } catch (err) {
        response.json("Ошибка со стороны сервера")
    }
}
module.exports = {
    getAllDeps,
    getMasterCities,
    getCityMasters,
    deleteDependency,
    createDependency
}
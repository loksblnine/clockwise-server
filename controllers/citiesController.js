const models = require("../database/models");
const sequelize = require("../database/config/config");
const createCity = async (request, response) => {
    try {
        const city = await models.initModels(sequelize).city.create(
            request.body
        )
        return response.status(201).json(
            city
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
const getAllCities = async (request, response) => {
    try {
        const cities = await models.initModels(sequelize).city.findAll()
        return response.status(201).json(
            cities
        )
    } catch
        (e) {
        response.status(500).json(e.toString())
    }
}
const getCityById = async (request, response) => {
    try {
        const {id} = request.params
        const city = await models.initModels(sequelize).city.findAll({
            where: {
                city_id: id
            }
        })
        return response.status(201).json(
            city
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
const updateCity = async (request, response) => {
    try {
        const {id} = request.params
        const {city_name} = request.body
        await models.initModels(sequelize).city.update({
                city_name
            },
            {
                where:
                    {city_id: id}
            })
        const city = await models.initModels(sequelize).city.findAll({
            where: {
                city_id: id
            }
        })
        return response.status(201).json(
            city
        )
    } catch (err) {
        response.status(500).json("Something went wrong")
    }
}
const deleteCity = async (request, response) => {
    try {
        const {id} = request.params
        await models.initModels(sequelize).city.destroy({
            where: {
                city_id: id
            }
        })
        response.status(201).json("Success!")
    } catch (err) {
        response.status(500).json("Something went wrong")
    }
}
module.exports = {
    createCity,
    getAllCities,
    getCityById,
    updateCity,
    deleteCity
}

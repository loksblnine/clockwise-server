const validation = require("../validation/validation");
const pool = require("../db");

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
        response.json(e.toString())
    }
}
const getAllCities = async (request, response) => {
    // try {
    //     const allCities = await pool.query("SELECT * FROM cities ORDER BY city_id")
    //     response.json(allCities.rows)
    // } catch (e) {
    //     response.json(e.toString())
    // }
}
const getCityById = async (request, response) => {
    try {
        const {id} = request.params;
        const city = await pool.query("SELECT * FROM cities WHERE city_id = ($1)", [id])
        response.json(city.rows[0])
    } catch (e) {
        response.json(e.toString())
    }
}
const updateCity = async (request, response) => {
    const {id} = request.params;
    const {city_name} = request.body
    if (validation.isNameValid(city_name))
        try {
            await pool.query(
                "UPDATE cities SET city_name = $2 WHERE city_id = ($1)",
                [id, city_name])
            response.json("Обновления города сохранены")
        } catch (e) {
            response.json("Возникли трудности")
        }
    else {
        response.json("Введите данные корректно")
    }
}

const deleteCity = async (request, response) => {
    try {
        const {id} = request.params;
        await pool.query("DELETE FROM cities WHERE city_id = ($1)", [id])
        response.json("Город удален")
    } catch (e) {
        response.json(e.toString())
    }
}

module.exports = {
    createCity,
    getAllCities,
    getCityById,
    updateCity,
    deleteCity
}
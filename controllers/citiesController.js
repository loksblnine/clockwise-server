const validation = require("../validation/validation");
const pool = require("../db");

const createCity = async (request, response) => {
    const {city_name} = request.body
    if (validation.isNameValid(city_name))
        try {
            const newCity = await pool.query("INSERT INTO cities (city_name) VALUES ($1) RETURNING *",
                [city_name]);
            response.json(newCity.rows[0])
        } catch (e) {
            response.json("Ошибка со стороны сервера")
        }
    else {
        response.json("Введите данные корректно")
    }
}
const getAllCities = async (request, response) => {
    try {
        const allCities = await pool.query("SELECT * FROM cities ORDER BY city_id")
        response.json(allCities.rows)
    } catch (e) {
        response.json(e.toString())
    }
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

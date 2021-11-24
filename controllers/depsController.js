const models = require("../database/models");
const sequelize = require("../database/config/config");
const getAllDeps = async (request, response) => {
    try {
        const allDeps = await pool.query("SELECT * FROM connect_city_master ORDER BY master_id")
        response.json(allDeps.rows)
    } catch (e) {
        response.json(e.toString())
    }
}
const getMasterCities = async (request, response) => {
    try {
        const {id} = request.params;
        const masterCities = await pool.query("SELECT * FROM connect_city_master WHERE master_id = ($1)", [id])
        response.json(masterCities.rows.map(r => r.city_id))
    } catch (e) {
        response.json(e.toString())
    }
}
const getCityMasters = async (request, response) => {
    try {
        const {id} = request.params;
        const mastersInCity = await pool.query("SELECT * FROM connect_city_master WHERE city_id = ($1)", [id])
        response.json(mastersInCity.rows.map(r => r.master_id))
    } catch (e) {
        response.json(e.toString())
    }
}
const deleteDependency = async (request, response) => {
    const {city_id, master_id} = request.body
    try {
        await pool.query("DELETE FROM connect_city_master WHERE city_id = ($1) AND master_id = ($2)", [city_id, master_id])
        response.json("Город у мастера был удален")
    } catch (e) {
        response.json(e.toString())
    }
}
const createDependency = async (request, response) => {
    try {
        const depcy = await models.initModels(sequelize).connect_city_master.create(
            request.body
        )
        return response.status(201).json({
            depcy
        })
    } catch
        (e) {
        response.json(e.toString())
    }
}

module.exports = {
    getAllDeps,
    getMasterCities,
    getCityMasters,
    deleteDependency,
    createDependency
}
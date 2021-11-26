const models = require("../database/models");
const sequelize = require("../database/config/config");
const {Op} = require("sequelize");
const createMaster = async (request, response) => {
    try {
        const master = await models.initModels(sequelize).master.create(
            request.body
        )
        return response.status(201).json(
            master
        )
    } catch
        (e) {
        response.json("Ошибка валидации")
    }
}
const getMasters = async (request, response) => {
    try {
        const {page} = request.params
        const offset = 10 * page
        const masters = await models.initModels(sequelize).master.findAndCountAll({
            offset,
            limit: 10
        })
        response.status(201).json(masters.rows)
    } catch (e) {
        response.json("Ошибка со стороны сервера")
    }
}
const getMasterById = async (request, response) => {
    try {
        const {id} = request.params
        const master = await models.initModels(sequelize).master.findOne({
            where: {
                master_id: id
            }
        })
        return response.status(201).json(
            master
        )
    } catch
        (e) {
        response.json("Ошибка со стороны сервера")
    }
}
const getFreeMasters = async (request, response) => {
    try {
        const {city_id, order_time, work_id} = request.body
        const startDate = new Date(order_time)
        const startHour = startDate.getHours()
        const finishHour = Number(work_id) + startHour
        const endDate = new Date(order_time).setHours(finishHour)
        let deps = (await models.initModels(sequelize).connect_city_master.findAll({
            attributes: ['city_id', 'master_id'],
            where: {city_id: city_id},
            include: [{
                model: models.initModels(sequelize).master,
                as: "master",
                attributes: ['master_name', 'ranking']
            },
            ],
            raw: true
        }))
        const masters = []
        for (const dep of deps) {
            const orders = await models.initModels(sequelize).order.findAll({
                where: {
                    master_id: dep.master_id,
                    "order_time": {
                        [Op.between]: [startDate, endDate]
                    }
                },
                raw: true
            })
            if (!orders.length)
                masters.push(dep)
        }
        response.status(201).json(masters)
    } catch (e) {
        response.status(500).json("Something went wrong")
    }
}
const updateMaster = async (request, response) => {
    try {
        const {id} = request.params
        const {master_name, master_email, ranking} = request.body
        await models.initModels(sequelize).master.update({
                master_name, master_email, ranking
            },
            {
                where:
                    {master_id: id}
            })
        response.status(201).json("Success!")
    } catch (err) {
        response.status(500).json("Something went wrong")
    }
}
const deleteMaster = async (request, response) => {
    try {
        const {id} = request.params
        await models.initModels(sequelize).master.destroy({
            where: {
                master_id: id
            }
        })
        response.status(201).json("Success!")
    } catch (err) {
        response.status(500).json("Something went wrong")
    }
}
const getMasterByEmail = async (request, response) => {
    try {
        const master = await models.initModels(sequelize).master.findCreateFind({
                where: {email: request.body.email},
                defaults: {
                    master_name: request.body.master_name,
                    ranking: request.body.ranking
                }
            }
        )
        return response.status(201).json(
            master[0]
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
module.exports = {
    createMaster,
    getMasters,
    getMasterById,
    getFreeMasters,
    updateMaster,
    deleteMaster,
    getMasterByEmail
}
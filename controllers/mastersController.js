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
        response.json(e.toString())
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
        // const order = request.body
        // order.order_time = new Date(order.order_time)
        // const startHour = order.order_time.getHours()
        // const finishHour = Number(order.work_id) + startHour
        // const endDate = new Date(order.order_time).setHours(finishHour)
        const {id} = request.params
        let deps = (await models.initModels(sequelize).connect_city_master.findAll({
            attributes: ['city_id', 'master_id'],
            where: {
                city_id: id
            },
            include: [{
                model: models.initModels(sequelize).master,
                as: "master",
                attributes: ['master_name', 'ranking']
            },
            ],
            raw: true
        }))
        response.status(201).json(deps)
    } catch (e) {
        console.log(e)
        response.json("Ошибка со стороны сервера")
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
        response.status(201).json("Изменения сохранены!")
    } catch (err) {
        response.json("Ошибка со стороны сервера")
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
        response.status(201).json("Мастер удален")
    } catch (err) {
        response.json("Ошибка со стороны сервера")
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
        response.json("Ошибка со стороны сервера")
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
const models = require("../database/models");
const sequelize = require("../database/config/config");
const createOrder = async (request, response) => {
    try {
        const order = await models.initModels(sequelize).order.create(
            request.body
        )
        return response.status(201).json(
            order
        )
    } catch
        (e) {
        response.json(e.toString())
    }
}
const updateOrder = async (request, response) => {
    try {
        const {id} = request.params
        const {customer_id, master_id, city_id, work_id, order_time} = request.body
        await models.initModels(sequelize).order.update({
                customer_id, master_id, city_id, work_id, order_time
            },
            {
                where:
                    {order_id: id}
            })
        response.json("Изменения сохранены!")
    } catch (err) {
        response.json("Ошибка со стороны сервера")
    }
}
const deleteOrder = async (request, response) => {
    try {
        const {id} = request.params
        await models.initModels(sequelize).order.destroy({
            where: {
                order_id: id
            }
        })
        response.json("Заказ удален")
    } catch (err) {
        response.json("Ошибка со стороны сервера")
    }
}
const getOrders = async (request, response) => {
    try {
        const {page} = request.params
        const offset = 10 * page
        const orders = await models.initModels(sequelize).order.findAndCountAll({
            include: [{
                model: models.initModels(sequelize).master,
                as: "master"
            }, {
                model: models.initModels(sequelize).city,
                as: 'city',
            }, {
                model: models.initModels(sequelize).customer,
                as: 'customer',
            },
            ],
            offset,
            limit: 10
        })
        response.status(201).json(orders.rows)
    } catch
        (e) {
        response.json("Ошибка со стороны сервера")
    }
}
const getOrderById = async (request, response) => {
    try {
        const {id} = request.params
        const order = await models.initModels(sequelize).order.findAll({
            where: {
                order_id: id
            }
        })
        return response.status(201).json(
            order
        )
    } catch
        (e) {
        response.json("Ошибка со стороны сервера")
    }
}
const getMasterOrders = async (request, response) => {
    try {
        const master_id = request.params.id
        const {page} = request.params
        const offset = 10 * page
        const orders = await models.initModels(sequelize).order.findAndCountAll({
            include: [{
                model: models.initModels(sequelize).city,
                as: 'city',
            }, {
                model: models.initModels(sequelize).customer,
                as: 'customer',
            },
            ],
            where: {
                master_id
            },
            offset,
            limit: 10
        })
        response.status(201).json(orders.rows)
    } catch (e) {
        response.json("Ошибка со стороны сервера")
    }
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrderById,
    getMasterOrders
}
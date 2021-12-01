const models = require("../database/models");
const sequelize = require("../database/config/config");
const createOrder = async (request, response) => {
    try {
        const customer = await models.initModels(sequelize).customer.findCreateFind({
                where: {customer_email: request.body.customer_email},
                defaults: {
                    customer_name: request.body.customer_name,
                    customer_email: request.body.customer_email
                },
                raw: true
            }
        )
        const order = await models.initModels(sequelize).order.create(
            {...request.body, customer_id: customer[0].customer_id}
        )
        return response.status(201).json(
            order
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
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
        const order = await models.initModels(sequelize).order.findOne({
            where: {
                order_id: id
            },
            attributes: ['order_id', 'order_time', 'master_id', 'city_id', 'customer_id', 'isDone', 'work_id'],
            include: [{
                model: models.initModels(sequelize).master,
                as: "master",
                attributes: ['master_name']
            }, {
                model: models.initModels(sequelize).city,
                as: 'city',
                attributes: ['city_name']
            }, {
                model: models.initModels(sequelize).customer,
                as: 'customer',
                attributes: ['customer_name']
            },
            ]
        })
        return response.status(201).json(
            order
        )
    } catch (err) {
        response.status(500).json("Something went wrong")
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
        response.json("Success")
    } catch (err) {
        response.status(500).json("Something went wrong")
    }
}
const getOrders = async (request, response) => {
    try {
        const {page} = request.params
        const offset = 10 * page
        const orders = await models.initModels(sequelize).order.findAndCountAll({
            order: [
                ['order_time', 'DESC'],
                ['order_id', 'ASC'],
            ],
            attributes: ['order_id', 'order_time', 'master_id', 'city_id', 'customer_id', 'isDone', 'work_id'],
            include: [{
                model: models.initModels(sequelize).master,
                as: "master",
                attributes: ['master_name']
            }, {
                model: models.initModels(sequelize).city,
                as: 'city',
                attributes: ['city_name']
            }, {
                model: models.initModels(sequelize).customer,
                as: 'customer',
                attributes: ['customer_name']
            },
            ],
            offset,
            limit: 10
        })
        response.status(201).json(orders.rows)
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
const getOrderById = async (request, response) => {
    try {
        const {id} = request.params
        const order = await models.initModels(sequelize).order.findOne({
            where: {
                order_id: id
            },
            attributes: ['order_id', 'order_time', 'master_id', 'city_id', 'customer_id', 'isDone', 'work_id'],
            include: [{
                model: models.initModels(sequelize).master,
                as: "master",
                attributes: ['master_name']
            }, {
                model: models.initModels(sequelize).city,
                as: 'city',
                attributes: ['city_name']
            }, {
                model: models.initModels(sequelize).customer,
                as: 'customer',
                attributes: ['customer_name']
            },
            ],
        })
        return response.status(201).json(
            order
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
const getMasterOrders = async (request, response) => {
    try {
        const master_id = request.params.id
        const {page} = request.params
        const offset = 10 * page
        const orders = await models.initModels(sequelize).order.findAndCountAll({
            order: [
                ['order_time', 'DESC'],
                ['order_id', 'ASC'],
            ],
            include: [{
                model: models.initModels(sequelize).city,
                as: 'city',
                attributes: ['city_name']
            }, {
                model: models.initModels(sequelize).customer,
                as: 'customer',
                attributes: ['customer_name']
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
        response.status(500).json("Something went wrong")
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
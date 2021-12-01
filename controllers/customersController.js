const models = require("../database/models");
const sequelize = require("../database/config/config");

const createCustomer = async (request, response) => {
    try {
        const customer = await models.initModels(sequelize).customer.create(
            request.body
        )
        return response.status(201).json(
            customer
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
const getCustomers = async (request, response) => {
    try {
        const {page} = request.params
        const offset = 10 * page
        const customers = await models.initModels(sequelize).customer.findAndCountAll({
            offset,
            limit: 10
        })
        response.status(201).json(customers.rows)
    } catch (e) {
        response.status(500).json("Something went wrong")
    }
}
const getCustomerById = async (request, response) => {
    try {
        const {id} = request.params
        const customer = await models.initModels(sequelize).customer.findOne({
            where: {
                customer_id: id
            }
        })
        return response.status(201).json(
            customer
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
const updateCustomer = async (request, response) => {
    try {
        const {id} = request.params
        const {customer_name, customer_email} = request.body
        await models.initModels(sequelize).customer.update({
                customer_name, customer_email
            },
            {
                where: {
                    customer_id: id
                }
            }
        )
        const customer = await models.initModels(sequelize).customer.findOne({
            where: {
                customer_id: id
            }
        })
        return response.status(201).json(
            customer
        )
    } catch (err) {
        response.status(500).json("Something went wrong")
    }
}
const deleteCustomer = async (request, response) => {
    try {
        const {id} = request.params
        await models.initModels(sequelize).customer.destroy({
            where: {
                customer_id: id
            }
        })
        response.status(201).json("Success!")
    } catch (err) {
        response.status(500).json("Something went wrong")
    }
}

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}
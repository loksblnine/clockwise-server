const validation = require("../validation/validation");
const pool = require("../db");
const models = require("../database/models");
const sequelize = require("../database/config/config");

const createCustomer = async (request, response) => {
    try {
        const customer = await models.initModels(sequelize).customer.create(
            request.body
        )
        return response.status(201).json({
            customer
        })
    } catch
        (e) {
        response.json(e.toString())
    }
}

const getCustomers = async (request, response) => {
    try {
        const itemsPerPage = 10
        const page = request.params.page
        const offset = itemsPerPage * page
        const masters = await pool.query("SELECT * FROM customers ORDER BY customer_id ASC LIMIT ($1) OFFSET ($2)", [itemsPerPage, offset])
        response.json(masters.rows)
    } catch (e) {
        response.json(e.toString())
    }
}

const getCustomerById = async (request, response) => {
    try {
        const {id} = request.params;
        const customer = await pool.query("SELECT * FROM customers WHERE customer_id = ($1)", [id])
        response.json(customer.rows[0])
    } catch (e) {
        response.json(e.toString())
    }
}

const updateCustomer = async (request, response) => {
    const {id} = request.params;
    const {customer_name, customer_email} = request.body
    if (validation.isNameValid(customer_name) && validation.isEmailValid(customer_email))
        try {
            await pool.query(
                "UPDATE customers SET customer_name = $2, customer_email = $3 WHERE customer_id = ($1)",
                [id, customer_name, customer_email])
            response.json("Изменения данных покупателя сохранены")
        } catch (e) {
            response.json(e.toString())
        }
    else {
        response.json("Возникли трудности")
    }
}

const deleteCustomer = async (request, response) => {
    try {
        const {id} = request.params;
        await pool.query("DELETE FROM customers WHERE customer_id = ($1)", [id])
        response.json("Покупатель был удален")
    } catch (e) {
        response.json(e.toString())
    }
}

const getCustomerByEmail = async (request, response) => {
    try {
        const {email} = request.params;
        const customer = await pool.query("SELECT * FROM customers WHERE customer_email = ($1)", [email])
        response.json(customer.rows[0])
    } catch (e) {
        response.status(404).json(e.toString())
    }
}

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getCustomerByEmail
}
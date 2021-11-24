const validation = require("../validation/validation");
const pool = require("../db");
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
    const {id} = request.params;
    const {customer_id, master_id, city_id, work_id, order_time} = request.body
    try {
        await pool.query(
            "UPDATE orders SET customer_id = $2, master_id = $3, city_id = $4, work_id = $5, order_time = $6 WHERE order_id = ($1)",
            [id, customer_id, master_id, city_id, work_id, order_time])
        response.json("Данные заказа были обновлены")
    } catch (e) {
        response.json(e.toString())
    }
}
const deleteOrder = async (request, response) => {
    try {
        const {id} = request.params;
        await pool.query("DELETE FROM orders WHERE order_id = ($1)", [id])
        response.json("Заказ удален")
    } catch (e) {
        response.json(e.toString())
    }
}
const getOrders = async (request, response) => {
    try {
        const itemsPerPage = 5
        const page = request.params.page
        const offset = itemsPerPage * page
        const orders = await pool.query(`SELECT order_id, orders.master_id, master_name, orders.city_id, city_name, orders.customer_id, customer_name, order_time, work_id FROM orders 
            INNER JOIN masters on orders.master_id = masters.master_id
            INNER JOIN customers on orders.customer_id = customers.customer_id
            INNER JOIN cities on orders.city_id = cities.city_id
            ORDER BY order_time DESC, order_id LIMIT ($1) OFFSET ($2)`, [itemsPerPage, offset])
        response.json(orders.rows)
    } catch (e) {
        response.json(e.toString())
    }
}
const getOrderById = async (request, response) => {
    try {
        const {id} = request.params;
        const order = await pool.query("SELECT * FROM orders WHERE order_id = ($1)", [id])
        response.json(order.rows[0])
    } catch (e) {
        response.json(e.toString())
    }
}
const getMasterOrders = async (request, response) => {
    try {
        const itemsPerPage = 5
        const page = request.params.page
        const master_id = request.params.id
        const offset = itemsPerPage * page
        const orders = await pool.query(`SELECT order_id, orders.master_id, master_name, orders.city_id, city_name, orders.customer_id, customer_name, order_time, work_id FROM orders 
            INNER JOIN masters on orders.master_id = masters.master_id
            INNER JOIN customers on orders.customer_id = customers.customer_id
            INNER JOIN cities on orders.city_id = cities.city_id
            WHERE orders.master_id = ($3)
            ORDER BY order_time DESC, order_id LIMIT ($1) OFFSET ($2)`, [itemsPerPage, offset, master_id])
        response.json(orders.rows)
    } catch (e) {
        response.json(e.toString())
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
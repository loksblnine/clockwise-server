"use strict";
const express = require("express");
let router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const validation = require('../validation/validation')
const pool = require("../db");
//region orders
router
    .route('/')
    .post(async (request, response) => {
        const order = request.body
        if (validation.isDateValid(order.order_time))
            try {
                const newOrder = await pool.query("INSERT INTO orders (customer_id, master_id, city_id, work_id, order_time) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                    [order.customer_id, order.master_id, order.city_id, order.work_id, order.order_time]);
                response.json(newOrder.rows[0])
            } catch (e) {
                response.json(e.toString())
            }
        else {
            response.json("Wrong order params")
        }
    })
router
    .route('/offset/:page')
    .get(authMiddleware, async (request, response) => {
        try {
            const itemsPerPage = 5
            const page = request.params.page
            const offset = itemsPerPage * page
            const allOrders = await pool.query("SELECT * FROM orders ORDER BY order_time DESC, order_id LIMIT ($1) OFFSET ($2)", [itemsPerPage, offset])
            response.json(allOrders.rows)
        } catch (e) {
            response.json(e.toString())
        }
    })
router
    .route('/:id')
    .get(authMiddleware, async (request, response) => {
        try {
            const {id} = request.params;
            const order = await pool.query("SELECT * FROM orders WHERE order_id = ($1)", [id])
            response.json(order.rows[0])
        } catch (e) {
            response.json(e.toString())
        }
    })
    .put(authMiddleware, async (request, response) => {
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
    })
    .delete(authMiddleware, async (request, response) => {
        try {
            const {id} = request.params;
            await pool.query("DELETE FROM orders WHERE order_id = ($1)", [id])
            response.json("Заказ удален")
        } catch (e) {
            response.json(e.toString())
        }
    })
//endregion
module.exports = router
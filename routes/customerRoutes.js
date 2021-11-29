"use strict";
const express = require("express");
let router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const validation = require('../validation/validation')
const pool = require("../db");
//region customers
router
    .route('/')
    .post(async (request, response) => {
        const {customer_name, customer_email} = request.body
        if (validation.isNameValid(customer_name) && validation.isEmailValid(customer_email))
            try {
                const newCustomer = await pool.query("INSERT INTO customers (customer_name, customer_email) VALUES ($1, $2) RETURNING *",
                    [customer_name, customer_email]);
                response.json(newCustomer.rows[0])
            } catch (e) {
                response.json(e.toString())
            }
        else {
            response.json("Возникли трудности")
        }
    })
    .get(authMiddleware, async (request, response) => {
        try {
            const allCustomers = await pool.query("SELECT * FROM customers ORDER BY customer_id")
            response.json(allCustomers.rows)
        } catch (e) {
            response.json(e.toString())
        }
    })
router
    .route('/offset/:page')
    .get(async (request, response) => {
        try {
            const itemsPerPage = 10
            const page = request.params.page
            const offset = itemsPerPage * page
            const masters = await pool.query("SELECT * FROM customers ORDER BY customer_id ASC LIMIT ($1) OFFSET ($2)", [itemsPerPage, offset])
            response.json(masters.rows)
        } catch (e) {
            response.json(e.toString())
        }
    })
router
    .route('/:id')
    .get(authMiddleware, async (request, response) => {
        try {
            const {id} = request.params;
            const customer = await pool.query("SELECT * FROM customers WHERE customer_id = ($1)", [id])
            response.json(customer.rows[0])
        } catch (e) {
            response.json(e.toString())
        }
    })
    .put(authMiddleware, async (request, response) => {
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
    })
    .delete(authMiddleware, async (request, response) => {
        try {
            const {id} = request.params;
            await pool.query("DELETE FROM customers WHERE customer_id = ($1)", [id])
            response.json("Покупатель был удален")
        } catch (e) {
            response.json(e.toString())
        }
    })
router.route('/email/:email')
    .get(async (request, response) => {
        try {
            const {email} = request.params;
            const customer = await pool.query("SELECT * FROM customers WHERE customer_email = ($1)", [email])
            response.json(customer.rows[0])
        } catch (e) {
            response.status(404).json(e.toString())
        }
    })

//endregion
module.exports = router
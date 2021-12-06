const express = require("express");
let router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const authCustomerMiddleware = require('../middleware/authCustomerMiddleware')
const customerController = require('../controllers/customersController')

router
    .route('/')
    .post(customerController.createCustomer)
router
    .route('/offset/:page')
    .get(authMiddleware, customerController.getCustomers)
router
    .route('/:id')
    .get(authMiddleware, customerController.getCustomerById)
    .put(authMiddleware, customerController.updateCustomer)
    .delete(authMiddleware, customerController.deleteCustomer)
router
    .route("/email/:email")
    .get(authCustomerMiddleware, customerController.getCustomerByEmail)


module.exports = router
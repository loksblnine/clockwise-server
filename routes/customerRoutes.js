const express = require("express");
let router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
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


module.exports = router
const express = require("express");
let router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const customerController = require('../controllers/customersController')

router
    .route('/')
    .post(customerController.createCustomer)
router
    .route('/offset/:page')
    .get(customerController.getCustomers)
router
    .route('/:id')
    .get(authMiddleware, customerController.getCustomerById)
    .put(authMiddleware, customerController.updateCustomer)
    .delete(authMiddleware, customerController.deleteCustomer)
router.route('/email')
    .post(customerController.getCustomerByEmail)

module.exports = router
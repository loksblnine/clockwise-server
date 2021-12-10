const express = require("express");
let router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const authCustomerMiddleware = require('../middleware/authCustomerMiddleware')
const authMasterMiddleware = require('../middleware/authMasterMiddleware')
const ordersController = require('../controllers/ordersController')

router
    .route('/')
    .post(ordersController.createOrder)
router
    .route('/offset/:page')
    .get(authMiddleware, ordersController.getOrders)
router
    .route('/master/:id/offset/:page')
    .get(authMasterMiddleware, ordersController.getMasterOrders)
router
    .route('/customer/:id/offset/:page')
    .get(authCustomerMiddleware, ordersController.getCustomerOrders)
router
    .route('/:id')
    .get(authMiddleware, ordersController.getOrderById)
    .put(authMiddleware, ordersController.updateOrder)
    .delete(authMiddleware, ordersController.deleteOrder)

module.exports = router
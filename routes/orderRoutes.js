const express = require("express");
let router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const authCustomerMiddleware = require('../middleware/authMasterMiddleware')
const authMasterMiddleware = require('../middleware/authMasterMiddleware')
const ordersController = require('../controllers/ordersController')

router
    .route('/')
    .post(ordersController.createOrder)
router
    .route('/offset/:page')
    .get(authMiddleware, ordersController.getOrders)
router
    .route('/master/:email/offset/:page')
    .get(authMasterMiddleware, ordersController.getMasterOrders)
router
    .route('/master/:email/offset/:page')
    .get(authMasterMiddleware, ordersController.getMasterOrders)
router
    .route('/customer/:email/offset/:page')
    .get(authCustomerMiddleware, ordersController.getCustomerOrders)
router
    .route('/:id')
    .get(authMiddleware, ordersController.getOrderById)
    .put(authMiddleware, ordersController.updateOrder)
    .delete(authMiddleware, ordersController.deleteOrder)

module.exports = router
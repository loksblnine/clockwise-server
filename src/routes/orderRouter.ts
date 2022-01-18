import express from "express";
import * as orderController from "../controllers/orderController"
import {authCustomerMiddleware, authMasterMiddleware, authMiddleware} from "../middleware/authMiddleware";

const orderRouter = express.Router();

orderRouter
    .route('/')
    .post(orderController.createOrder)
orderRouter
    .route('/offset/:page')
    .get(authMiddleware, orderController.getOrders)
orderRouter
    .route('/master/:id/offset/:page')
    .get(authMasterMiddleware, orderController.getMasterOrders)
orderRouter
    .route('/master/:id/calendar')
    .get(authMasterMiddleware, orderController.getOrdersCalendar)
orderRouter
    .route('/customer/:id/offset/:page')
    .get(authCustomerMiddleware, orderController.getCustomerOrders)
orderRouter
    .route('/:id')
    .get(authMiddleware, orderController.getOrderById)
    .put(authMiddleware, orderController.updateOrder)
    .delete(authMiddleware, orderController.deleteOrder)

export default orderRouter

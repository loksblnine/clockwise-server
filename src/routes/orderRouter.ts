import express from "express";
import * as orderController from "../controllers/orderController"
import {authCustomerMiddleware, authMasterMiddleware, authMiddleware} from "../middleware/authMiddleware";

const orderRouter = express.Router();

orderRouter
    .route('/')
    .post(orderController.createOrder)
orderRouter
    .route('/offset/:page')
    .get(authMiddleware, orderController.getOrders)//auth
orderRouter
    .route('/master/:id/offset/:page')
    .get(authMasterMiddleware, orderController.getMasterOrders)//auth master
orderRouter
    .route('/customer/:id/offset/:page')
    .get(authCustomerMiddleware, orderController.getCustomerOrders)//auth customer
orderRouter
    .route('/:id')
    .get(authMiddleware, orderController.getOrderById)//auth
    .put(authMiddleware, orderController.updateOrder)//auth
    .delete(authMiddleware, orderController.deleteOrder)//auth

export default orderRouter

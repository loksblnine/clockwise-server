import express from "express";
import * as customerController from "../controllers/customerController"
import {authCustomerMiddleware, authMiddleware} from "../middleware/authMiddleware";

const customerRouter = express.Router();

customerRouter
    .route('/')
    .post(customerController.createCustomer)
customerRouter
    .route('/offset/:page')
    .get(authMiddleware, customerController.getCustomers)
customerRouter
    .route('/:id')
    .get(authMiddleware, customerController.getCustomerById)
    .put(authCustomerMiddleware, customerController.updateCustomerById)
    .delete(authMiddleware, customerController.deleteCustomerById)
customerRouter
    .route("/email/:email")
    .get(authCustomerMiddleware, customerController.getCustomerByEmail)

export default customerRouter

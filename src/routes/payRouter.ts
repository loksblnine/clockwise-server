import express from "express";
import * as payController from '../controllers/payController'
import {authMiddleware} from "../middleware/authMiddleware";

const payRouter = express.Router();

payRouter
    .route('/')
    .get(payController.pay);
payRouter
    .route('/order/:id')
    .get(authMiddleware, payController.getPaymentDetailsByOrderId);
payRouter
    .route('/isPaid/:id')
    .get(payController.getIsPaidByOrderId);

payRouter
    .route('/success')
    .get(payController.successPay);

payRouter
    .route('/cancel')
    .get(payController.cancelPay);

export default payRouter

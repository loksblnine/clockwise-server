import express from "express";
import * as payController from '../controllers/payController'

const payRouter = express.Router();

payRouter
    .route('/')
    .get(payController.pay);
payRouter
    .route('/order/:id')
    .get(payController.getPaymentDetailsByOrderId);

payRouter
    .route('/success')
    .get(payController.successPay);

payRouter
    .route('/cancel')
    .get(payController.cancelPay);

export default payRouter

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const braintree = require('braintree');
const payRouter = express_1.default.Router();
const gateway = new braintree.BraintreeGateway({
    accessToken: process.env.PAYPAL_ACCESS_TOKEN
});
payRouter
    .route("/client_token")
    .get(function (req, res) {
    gateway.clientToken.generate({}, function (err, response) {
        res.send(response.clientToken);
    });
});
const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox',
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
});
payRouter
    .route('/test_pay/:price')
    .get((req, res) => {
    const price = req.params.price;
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": `http://localhost:5000/pay/success?price=${price}`,
            "cancel_url": "http://localhost:5000/pay/cancel"
        },
        "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": price
                },
                "description": "Clockwise Clockware sends regards"
            }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        }
        else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
});
payRouter
    .route('/success')
    .get((req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const price = req.query.price;
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [
            {
                "amount": {
                    "currency": "USD",
                    "total": price
                }
            }
        ]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        }
        else {
            console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });
});
payRouter
    .route('/cancel')
    .get((req, response) => {
    response.status(503).send('Cancelled');
});
exports.default = payRouter;
//# sourceMappingURL=payRouter.js.map
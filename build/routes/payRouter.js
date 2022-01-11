"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("../database/models");
const payRouter = express_1.default.Router();
const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox',
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
});
payRouter
    .route('/')
    .get(async (req, res) => {
    const typeId = req.query.type;
    const type = await models_1.Type.findOne({
        where: {
            work_id: typeId
        }
    });
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": `http://localhost:5000/pay/success?price=${type?.price}`,
            "cancel_url": "http://localhost:5000/pay/cancel"
        },
        "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": type?.price
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
                    "currency": "UAH",
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
    response.redirect(String(process.env.FRONT_URL));
});
exports.default = payRouter;
//# sourceMappingURL=payRouter.js.map
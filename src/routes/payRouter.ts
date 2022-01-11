import express, {Request, Response} from "express";
import {Type} from "../database/models";

const braintree = require('braintree')

const payRouter = express.Router();

const gateway = new braintree.BraintreeGateway({
    accessToken: process.env.PAYPAL_ACCESS_TOKEN
});

payRouter
    .route("/client_token")
    .get(function (req, res) {
        gateway.clientToken.generate({}, function (err: any, response: any) {
            res.send(response.clientToken);
        });
    });

const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

payRouter
    .route('/')
    .get(async (req: Request, res: Response) => {
        const typeId = req.query.type
        const type: Type | null = await Type.findOne({
            where: {
                work_id: typeId
            }
        })
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
                "item_list": {
                    "items": [{
                        "name": "Red Sox Hat",
                        "sku": "001",
                        "price": "25.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": price
                },
                "description": "Clockwise Clockware sends regards"
            }]
        };

        paypal.payment.create(create_payment_json, function (error: any, payment: { links: string | any[]; }) {
            if (error) {
                throw error;
            } else {
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
    .get((req: Request, res: Response) => {
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

        paypal.payment.execute(paymentId, execute_payment_json, function (error: any, payment: any) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                res.send('Success');
            }
        });
    });

payRouter
    .route('/cancel')
    .get((req: Request, response: Response): void => {
        response.status(503).send('Cancelled')
    });

export default payRouter

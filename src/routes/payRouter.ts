import express, {Request, Response} from "express";
import {Type} from "../database/models";

const payRouter = express.Router();

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
                "cancel_url": `${process.env.SERVER_URL}/pay/cancel`
            },
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": type?.price
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
        paypal.payment.execute(paymentId, execute_payment_json, function (error: any, payment: any): void {
            if (error) {
                throw error;
            } else {
                res.status(201).json(JSON.stringify(payment));
            }
        });
    });

payRouter
    .route('/cancel')
    .get((req: Request, response: Response): void => {
        response.redirect(String(process.env.FRONT_URL))
    });

export default payRouter

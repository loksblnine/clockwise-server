import {Request, Response} from "express";
import {Order, Type} from "../database/models";
import {IOrder} from "../database/models/order";

const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

export const pay = async (req: Request, res: Response) => {
    const orderId = req.query.order_id
    const order: IOrder | null = await Order.findOne({
        raw: true,
        where: {
            order_id: orderId
        },
        include: [{
            model: Type,
            as: 'work',
            attributes: ['price']
        }]
    })
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": `${process.env.SERVER_URL}/pay/success?order_id=${orderId}`,
            "cancel_url": `${process.env.SERVER_URL}/pay/cancel`
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": order?.['work.price']
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
}

export const successPay = async (req: Request, res: Response) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const orderId = req.query.order_id;
    const order: IOrder | null = await Order.findOne({
        raw: true,
        where: {
            order_id: orderId
        },
        include: [{
            model: Type,
            as: 'work',
            attributes: ['price']
        }]
    })
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [
            {
                "amount": {
                    "currency": "USD",
                    "total": order?.['work.price']
                }
            }
        ]
    };
    paypal.payment.execute(paymentId, execute_payment_json, async (error: any): Promise<void> => {
        if (error) {
            throw error;
        } else {
            await Order.update({
                    isPaid: String(paymentId)
                },
                {
                    where: {
                        order_id: orderId
                    }
                })
            //send mail that order is paid
            //success route on front
            res.redirect(String(process.env.FRONT_URL));
        }
    });
}

export const cancelPay = (req: Request, response: Response): void => {
    response.redirect(String(process.env.FRONT_URL))
}

export const getPaymentDetailsByOrderId = async (req: Request, resp: Response): Promise<void> => {
    const orderId = req.params.id
    const order: IOrder | null = await Order.findOne({
        raw: true,
        where: {
            order_id: orderId
        }
    })
    if (order && order.isPaid)
        paypal.payment.get(order.isPaid, function (error: any, payment: any) {
            if (error) {
                resp.status(503).json("Something went wrong")
            } else {
                resp.status(200).json(payment);
            }
        });
    else {
        resp.status(404).json("Payment not found")
    }

}

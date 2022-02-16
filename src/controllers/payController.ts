import {Request, Response} from "express";
import {Customer, Order, Type} from "../database/models";
import {IOrder} from "../database/models/order";
import {generateJwt, LINK, sendMail} from "../utils/utils";
import {MailDataRequired} from "@sendgrid/helpers/classes/mail";

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
    if (order?.isPaid?.length) {
        res.redirect(`${process.env.FRONT_URL}/payment/success`)
    } else {
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `${process.env.SERVER_URL}/pay/success?order_id=${orderId}`,
                "cancel_url": `${process.env.SERVER_URL}/pay/cancel`,
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
            res.redirect(String(process.env.FRONT_URL) + "/payment/failed");
        } else {
            await Order.update({
                    isPaid: String(paymentId)
                },
                {
                    where: {
                        order_id: orderId
                    }
                })
            const token = generateJwt(req.body.user.id, req.body.user.email, req.body.user.role, "2h")
            const customer: Customer | null = await Customer.findOne({
                where: {
                    customer_id: order?.customer_id
                }
            })
            if (customer && process.env.USER && process.env.SG_TEMPLATE_ID_FINISH_ORDER) {
                const msg: MailDataRequired = {
                    to: String(customer.customer_email),
                    from: String(process.env.USER),
                    templateId: String(process.env.SG_TEMPLATE_ID_PAID_ORDER),
                    dynamicTemplateData: {
                        order_id: orderId,
                        link: LINK,
                        s_link: process.env.SERVER_URL,
                        token
                    }
                }
                sendMail(msg, res)
            }
            res.redirect(String(process.env.FRONT_URL) + "/payment/success");
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
export const getIsPaidByOrderId = async (req: Request, resp: Response): Promise<void> => {
    const orderId = req.params.id
    const order: IOrder | null = await Order.findOne({
        raw: true,
        where: {
            order_id: orderId
        }
    })
    if (order && order.isPaid)
        resp.status(200).json(true);
    else {
        resp.status(404).json(false)
    }
}

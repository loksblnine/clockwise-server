"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsPaidByOrderId = exports.getPaymentDetailsByOrderId = exports.cancelPay = exports.successPay = exports.pay = void 0;
const models_1 = require("../database/models");
const utils_1 = require("../utils/utils");
const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox',
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
});
const pay = async (req, res) => {
    const orderId = req.query.order_id;
    const order = await models_1.Order.findOne({
        raw: true,
        where: {
            order_id: orderId
        },
        include: [{
                model: models_1.Type,
                as: 'work',
                attributes: ['price']
            }]
    });
    if (order?.isPaid?.length) {
        res.redirect(`${process.env.FRONT_URL}/payment/success`);
    }
    else {
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
    }
};
exports.pay = pay;
const successPay = async (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const orderId = req.query.order_id;
    const order = await models_1.Order.findOne({
        raw: true,
        where: {
            order_id: orderId
        },
        include: [{
                model: models_1.Type,
                as: 'work',
                attributes: ['price']
            }]
    });
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
    paypal.payment.execute(paymentId, execute_payment_json, async (error) => {
        if (error) {
            res.redirect(String(process.env.FRONT_URL) + "/payment/failed");
        }
        else {
            await models_1.Order.update({
                isPaid: String(paymentId)
            }, {
                where: {
                    order_id: orderId
                }
            });
            const customer = await models_1.Customer.findOne({
                where: {
                    customer_id: order?.customer_id
                },
                raw: true
            });
            const user = await models_1.User.findOne({
                where: {
                    email: customer?.customer_email,
                    role: 3
                },
                raw: true
            });
            const token = (0, utils_1.generateJwt)(user?.user_id, customer?.customer_email, 3, "12h");
            if (customer?.customer_email && process.env.USER && process.env.SG_TEMPLATE_ID_PAID_ORDER) {
                const msg = {
                    to: String(customer.customer_email),
                    from: String(process.env.USER),
                    templateId: String(process.env.SG_TEMPLATE_ID_PAID_ORDER),
                    dynamicTemplateData: {
                        order_id: orderId,
                        s_link: process.env.SERVER_URL,
                        token
                    }
                };
                (0, utils_1.sendMail)(msg, res);
            }
            res.redirect(String(process.env.FRONT_URL) + "/payment/success");
        }
    });
};
exports.successPay = successPay;
const cancelPay = (req, response) => {
    response.redirect(String(process.env.FRONT_URL));
};
exports.cancelPay = cancelPay;
const getPaymentDetailsByOrderId = async (req, resp) => {
    const orderId = req.params.id;
    const order = await models_1.Order.findOne({
        raw: true,
        where: {
            order_id: orderId
        }
    });
    if (order && order.isPaid)
        paypal.payment.get(order.isPaid, function (error, payment) {
            if (error) {
                resp.status(503).json("Something went wrong");
            }
            else {
                resp.status(200).json(payment);
            }
        });
    else {
        resp.status(404).json("Payment not found");
    }
};
exports.getPaymentDetailsByOrderId = getPaymentDetailsByOrderId;
const getIsPaidByOrderId = async (req, resp) => {
    const orderId = req.params.id;
    const order = await models_1.Order.findOne({
        raw: true,
        where: {
            order_id: orderId
        }
    });
    if (order && order.isPaid)
        resp.status(200).json(true);
    else {
        resp.status(404).json(false);
    }
};
exports.getIsPaidByOrderId = getIsPaidByOrderId;
//# sourceMappingURL=payController.js.map
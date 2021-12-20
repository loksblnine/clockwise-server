const sgMail = require('@sendgrid/mail')
const jwt = require("jsonwebtoken");
const schedule = require('node-schedule');

sgMail.setApiKey(process.env.SG_API_KEY)

const testRoute = (request, response) => {
    try {
        response.json("This is route for sending mail")
    } catch (e) {
        response.json(e.toString())
    }
}

const sendConfirmOrderMail = function (request, response) {
    const time = new Date(request.body.order_time)
    const hourBefore = new Date(time.getFullYear(), time.getMonth(), time.getDate(), (time.getHours() - 2), time.getMinutes())
    console.log(time)
    console.log(hourBefore)
    schedule.scheduleJob(hourBefore, () => {
        sgMail
            .send({
                to: request.body.email,
                from: process.env.USER,
                template_id: process.env.SG_TEMPLATE_ID_REMEMBER,
            })
            .then(() =>
                console.log("scheduled" + request.body.email))
    })
    sgMail
        .send({
            to: request.body.email,
            from: process.env.USER,
            template_id: process.env.SG_TEMPLATE_ID_CONFIRM_ORDER,
            dynamic_template_data: {
                message: request.body.message
            }
        })
        .then(() => {
            response.status(201).json("Success!")
        })
        .catch(() => {
            response.status(500).json("Something went wrong")
        })
}
const sendConfirmRegistrationMail = function (request, response) {
    const token = jwt.sign(
        {activated: request.body.email},
        process.env.SECRET_KEY,
        {
            expiresIn: "900s",
        }
    );
    const LINK_WITH_TOKEN = (process.env.NODE_ENV === "production" ? (process.env.PROD_FRONT_URL + '/activate/') : (process.env.DEV_FRONT_URL + '/activate/')) + token
    const msg = {
        to: request.body.email,
        from: process.env.USER,
        template_id: process.env.SG_TEMPLATE_ID_CONFIRM_REGISTRATION,
        dynamic_template_data: {
            link: LINK_WITH_TOKEN
        }
    }
    sgMail
        .send(msg)
        .then(() => {
            response.status(201).json("Success!")
        })
        .catch((e) => {
            response.status(500).json(e.toString())
        })
}

module.exports = {
    sendConfirmRegistrationMail,
    sendConfirmOrderMail,
    testRoute
}
const sgMail = require('@sendgrid/mail')
const jwt = require("jsonwebtoken");
sgMail.setApiKey(process.env.SG_API_KEY)

const testRoute = async (request, response) => {
    try {
        response.json("This is route for sending mail")
    } catch (e) {
        response.json(e.toString())
    }
}

const sendConfirmOrderMail = function (request, response) {
    const msg = {
        to: request.body.email,
        from: process.env.USER,
        template_id: process.env.SG_TEMPLATE_ID_CONFIRM_ORDER,
        dynamic_template_data: {
            message: request.body.message
        }
    }
    sgMail
        .send(msg)
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
    const LINK_WITH_TOKEN = (process.env.NODE_ENV === "production" ? (process.env.PROD_FRONT_URL + '/activate') : (process.env.DEV_FRONT_URL + '/activate')) + token
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
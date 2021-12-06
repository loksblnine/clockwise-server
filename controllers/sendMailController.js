const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SG_API_KEY)

const testRoute = async (request, response) => {
    try {
        response.json("This is route for sending mail")
    } catch (e) {
        response.json(e.toString())
    }
}

const sendConfirmOrderMail =  function (request, response) {
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
        .catch((e) => {
            response.status(500).json("Something went wrong")
        })
}
const sendConfirmRegistrationMail =  function (request, response) {
    const msg = {
        to: request.body.email,
        from: process.env.USER,
        template_id: process.env.SG_TEMPLATE_ID_CONFIRM_REGISTRATION,
        dynamic_template_data: {
            link: process.env.NODE_ENV === "production" ? "https://clockwise-clockware-test.herokuapp.com/" : "http://localhost:5000/"
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

module.exports = {
    sendConfirmRegistrationMail,
    sendConfirmOrderMail,
    testRoute
}
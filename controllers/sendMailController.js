const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SG_API_KEY)

const testRoute = async (request, response) => {
    try {
        response.json("This is route for sending mail")
    } catch (e) {
        response.json(e.toString())
    }
}

const sendMail =  function (request, response) {
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
            response.json("Success!")
        })
        .catch((e) => {
            response.status(500).json("Something went wrong")
        })
}

module.exports = {
    sendMail,
    testRoute
}
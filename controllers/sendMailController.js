const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SG_API_KEY)

const testRoute = async (request, response) => {
    try {
        response.json("This is route for sending mail")
    } catch (e) {
        response.json(e.toString())
    }
}

const sendMail =  function (req, res) {
    const msg = {
        to: req.body.email,
        from: process.env.USER,
        template_id: process.env.SG_TEMPLATE_ID_CONFIRM_ORDER,
        dynamic_template_data: {
            message: req.body.message
        }
    }
    sgMail
        .send(msg)
        .then(() => {
            res.json({
                "success": true
            })
        })
        .catch((error) => {
            console.error(error)
        })
}

module.exports = {
    sendMail,
    testRoute
}
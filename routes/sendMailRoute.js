const express = require("express");
let router = express.Router();
const sendMailController = require('../controllers/sendMailController')

router
    .route('/confirm-order')
    .get(sendMailController.testRoute)
    .post(sendMailController.sendConfirmOrderMail)
router
    .route('/confirm-registration')
    .post(sendMailController.sendConfirmRegistrationMail)

module.exports = router
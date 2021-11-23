const express = require("express");
let router = express.Router();
const sendMailController = require('../controllers/sendMailController')

router
    .route('/')
    .get(sendMailController.testRoute)
    .post(sendMailController.sendMail)

module.exports = router
import express from "express";
import * as sendMailController from "../controllers/sendMailController"

const sendMailRouter = express.Router();

sendMailRouter
    .route('/confirm-order')
    .post(sendMailController.sendConfirmOrderMail)
sendMailRouter
    .route('/confirm-registration')
    .post(sendMailController.sendConfirmRegistrationMail)

export default sendMailRouter

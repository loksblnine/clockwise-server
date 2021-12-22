import {Request, Response} from "express";
import {MailDataRequired} from "@sendgrid/helpers/classes/mail";
import {LINK, sendMail} from "../utils/utils";
import jwt from "jsonwebtoken";
import schedule from "node-schedule"

export const testRoute = async (request: Request, response: Response): Promise<void> => {
    try {
        response.json("This is route for sending mail")
    } catch (e) {
        response.json(e.toString())
    }
}

export const sendConfirmOrderMail = async (request: Request, response: Response): Promise<void> => {
    try {
        const msg: MailDataRequired = {
            to: String(request.body.email),
            from: {name: "Clockwise Clockware", email: String(process.env.USER)},
            templateId: String(process.env.SG_TEMPLATE_ID_CONFIRM_ORDER),
            dynamicTemplateData: {
                message: request.body.message
            }
        }
        sendMail(msg, response)
        const time = new Date(request.body.order_time)
        const hourBefore = new Date(time.getFullYear(), time.getMonth(), time.getDate(), (time.getHours() - 3), time.getMinutes())
        schedule.scheduleJob(hourBefore, () => {
            const msg: MailDataRequired = {
                to: String(request.body.email),
                from: {name: "Clockwise Clockware", email: String(process.env.USER)},
                templateId: String(process.env.SG_TEMPLATE_ID_REMEMBER),
                dynamicTemplateData: {
                    message: request.body.message
                }
            }
            sendMail(msg, response)
        })
    } catch (e) {
        response.status(500).json("Something went wrong")
    }
}
export const sendConfirmRegistrationMail = async (request: Request, response: Response): Promise<void> => {
    try {
        const email: string = request?.body?.email
        if (email) {
            const token = jwt.sign(
                {activated: email},
                String(process.env.SECRET_KEY),
                {
                    expiresIn: "900s",
                }
            );
            const LINK_WITH_TOKEN = LINK + '/activate/' + token
            const msg: MailDataRequired = {
                to: email,
                from: String(process.env.USER),
                templateId: String(process.env.SG_TEMPLATE_ID_CONFIRM_REGISTRATION),
                dynamicTemplateData: {
                    link: LINK_WITH_TOKEN
                }
            }
            sendMail(msg, response)
        } else {
            response.status(500).json("Something went wrong")
        }
    } catch (e) {
        response.status(500).json("Something went wrong")

    }
}

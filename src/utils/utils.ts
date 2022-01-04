import jwt from "jsonwebtoken"
import {Response} from "express";
import sgMail from "@sendgrid/mail"
import {MailDataRequired} from "@sendgrid/helpers/classes/mail";

sgMail.setApiKey(String(process.env.SG_API_KEY))
export const generateJwt = (id: number, email: string, role: number, time: string): string => {
    return jwt.sign(
        {id, email, role},
        String(process.env.SECRET_KEY),
        {
            expiresIn: time,
        }
    );
}
export const LINK = process.env.NODE_ENV === "production" ? (process.env.PROD_FRONT_URL) : (process.env.DEV_FRONT_URL)
export const sendMail = (message: MailDataRequired, response: Response): void => {
    sgMail
        .send(message)
        .then(() => {
            response.status(201).json("Success!")
        })
        .catch(() => {
            response.status(500).json("Something went wrong")
        })
}

type OrderTime = {
    [key: string]: string | string[]
}

export interface IWhere {
    master_id?: number
    city_id?: number,
    work_id?: number,
    isDone?: boolean,
    order_time?: OrderTime
}

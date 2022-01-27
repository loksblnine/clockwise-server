import jwt from "jsonwebtoken"
import {Request, Response} from "express";
import sgMail from "@sendgrid/mail"
import {MailDataRequired} from "@sendgrid/helpers/classes/mail";
import {Op} from "sequelize";

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
        .catch((e) => {
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

export const whereConstructor = (request: Request) => {
    const where: IWhere = {}
    if (request?.query?.city_id?.length) {
        where.city_id = Number(request.query.city_id)
    }
    if (request?.query?.master_id?.length) {
        where.master_id = Number(request.query.master_id)
    }
    if (request?.query?.isDone?.length) {
        where.isDone = request.query.isDone === "true"
    }
    if (request?.query?.work_id?.length) {
        where.work_id = Number(request.query.work_id)
    }
    if (request?.query?.from?.length && !request?.query?.to?.length) {
        where.order_time = {[Op.gte]: request.query.from}
    }
    if (request?.query?.to?.length && !request?.query?.from?.length) {
        where.order_time = {[Op.lte]: request.query.to}
    }
    if (request?.query?.to?.length && request?.query?.from?.length) {
        where.order_time = {[Op.between]: [request.query.from, request.query.to]}
    }
    return where
}
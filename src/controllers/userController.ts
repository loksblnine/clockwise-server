import {Request, Response} from "express";
import bcrypt from "bcrypt"
import jwt, {JwtPayload} from "jsonwebtoken"

import {Master, User, Customer, Order} from "../database/models";
import {generateJwt, LINK, sendMail} from "../utils/utils";
import {MailDataRequired} from "@sendgrid/helpers/classes/mail";

export const isTokenValid = async (request: Request, response: Response): Promise<void> => {
    const token = generateJwt(request.body.user.id, request.body.user.email, request.body.user.role, "2h")
    response.status(200).json({token});
}

export const registerUser = async (request: Request, response: Response): Promise<void> => {
    try {
        const email: string = request.body.email,
            password: string = request.body.password,
            role: number = request.body;
        if (!(email && password)) {
            response.status(400).send("Invalid credentials");
        }
        const encryptedPassword: string = await bcrypt.hash(password, 5);
        const newUser: User = await User.create({
            email, password: encryptedPassword, role
        })
        const token: string = generateJwt(newUser.user_id, email, role, "2h")
        switch (role) {
            case 1: {
                break;
            }
            case 2: {
                await Master.findCreateFind({
                    where: {
                        email
                    },
                    defaults: {
                        master_name: "Inactive Master", email, ranking: "5"
                    }
                })
                break;
            }
            case 3: {
                await Customer.findCreateFind({
                    where: {customer_email: email},
                    defaults: {
                        customer_name: "Inactive Customer", customer_email: email
                    }
                })
                break;
            }
            default: {
                break;
            }
        }
        response.status(201).json({token});
    } catch (err) {
        response.status(500).json("Something went wrong");
    }
}
export const loginUser = async (request: Request, response: Response): Promise<Response> => {
    try {
        const email: string = request.body.email,
            password: string = request.body.password;

        if (!(email && password)) {
            response.status(401).send("All input is required");
        }

        const oldUsers: User[] = await User.findAll({
            where: {
                email, isActive: true
            },
            raw: true
        })

        for (let i = 0; i < oldUsers?.length; i++) {
            const passwordMatch: boolean = await bcrypt.compare(password, oldUsers[i]?.password)
            if (passwordMatch) {
                const token = generateJwt(oldUsers[i].user_id, oldUsers[i].email, oldUsers[i].role, "2h")
                return response.status(200).json({token});
            }
        }
        return response.status(500).send("Something went wrong");
    } catch (err) {
        return response.status(500).send("Something went wrong");
    }
}
export const approveMaster = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id
        await Master.update({
                isApproved: true
            },
            {
                where:
                    {master_id: id}
            })
        const master: Master | null = await Master.findOne({
            where: {
                master_id: id
            }
        })
        if (master && process.env.USER && process.env.SG_TEMPLATE_ID_ACCOUNT_APPROVE) {
            const msg: MailDataRequired = {
                to: String(master?.email),
                from: {name: "Clockwise Clockware", email: String(process.env.USER)},
                templateId: String(process.env.SG_TEMPLATE_ID_ACCOUNT_APPROVE),
                dynamicTemplateData: {
                    link: LINK
                }
            }
            sendMail(msg, response)
        } else {
            response.status(500).send("Something went wrong");
        }
    } catch (e) {
        response.status(500).send("Something went wrong");
    }
}
export const approveUser = async (request: Request, response: Response): Promise<void> => {
    try {
        const token = String(request?.headers?.authorization?.split(' ')[1])
        if (!token) {
            response.status(401).json({message: "Не авторизован"})
        }
        const activated: JwtPayload | string = jwt.verify(token, String(process.env.SECRET_KEY))
        await User.update({
                isActive: true
            },
            {
                where:
                    {email: activated}
            })
        const user: User | null = await User.findOne({
            where: {
                email: activated
            }
        })
        if (user) {
            const newToken = generateJwt(user.user_id, user.email, user.role, "2h")
            response.status(201).json({token: newToken})
        }
        response.status(500).send("Something went wrong");
    } catch (e) {
        response.status(500).send("Something went wrong");
    }
}
export const approveOrder = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id
        await Order.update({
                isDone: true
            },
            {
                where: {
                    order_id: id
                },
            })
        const order: Order | null = await Order.findOne({
            where: {
                order_id: id
            },
            raw: true
        })
        if (order) {
            const customer: Customer | null = await Customer.findOne({
                where: {
                    customer_id: order.customer_id
                },
                raw: true
            })
            const master: Master | null = await Master.findOne({
                where: {
                    master_id: order.master_id
                }
            })
            if (customer && master && process.env.USER && process.env.SG_TEMPLATE_ID_FINISH_ORDER) {
                const msg: MailDataRequired = {
                    to: String(customer.customer_email),
                    from: String(process.env.USER),
                    templateId: String(process.env.SG_TEMPLATE_ID_FINISH_ORDER),
                    dynamicTemplateData: {
                        master_name: master.master_name,
                        order_id: id,
                        link: LINK
                    }
                }
                sendMail(msg, response)
            } else {
                response.status(500).send("Something went wrong");
            }
        } else {
            response.status(500).send("Something went wrong");
        }
    } catch (e) {
        response.status(500).send("Something went wrong");
    }
}
export const setMarkOrder = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id
        const mark = Number(request.body.mark)
        await Order.update({
            mark
        }, {
            where:
                {order_id: id}
        })
        response.status(201).json("Success")
    } catch (e) {
        response.status(500).send("Something went wrong");
    }
}

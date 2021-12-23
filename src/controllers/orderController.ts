import {Request, Response} from "express"
import {City, Customer, Master, Order, Photo} from "../database/models";
import {Op} from "sequelize"
import cloud from "../utils/cloudinary";
import {IWhere} from "../utils/utils";

export const createOrder = async (request: Request, response: Response): Promise<void> => {
    try {
        const customer = await Customer.findCreateFind({
                where: {
                    customer_email: request.body.customer_email
                },
                defaults: {
                    customer_name: request.body.customer_name,
                    customer_email: request.body.customer_email
                },
                raw: true
            }
        )
        const order = await Order.create(
            {...request.body, customer_id: customer[0].customer_id}
        )
        const fileStr = request.body?.data;
        for (let i = 0; i < fileStr?.length; i++) {
            const uploadResponse = await cloud.uploader.upload(fileStr[i], {
                folder: `order_photos/order${order.order_id}`
            });
            await Photo.create(
                {order_id: order.order_id, photo_url: uploadResponse.secure_url}
            )
        }
        response.status(201).json(
            order
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const updateOrder = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id
        const {customer_id, master_id, city_id, work_id, order_time} = request.body
        await Order.update({
                customer_id, master_id, city_id, work_id, order_time
            },
            {
                where: {
                    order_id: id
                }
            })
        const order = await Order.findOne({
            where: {
                order_id: id
            },
            attributes: ['order_id', 'order_time', 'master_id', 'city_id', 'customer_id', 'isDone', 'work_id'],
            include: [{
                model: Master,
                as: "master",
                attributes: ['master_name']
            }, {
                model: City,
                as: 'city',
                attributes: ['city_name']
            }, {
                model: Customer,
                as: 'customer',
                attributes: ['customer_name']
            },
            ]
        })
        response.status(201).json(
            order
        )
    } catch (err) {
        response.status(500).json("Something went wrong")
    }
}
export const deleteOrder = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id
        await Order.destroy({
            where: {
                order_id: id
            }
        })
        response.status(201).json(
            `Order ${id} was removed successfully`
        )
    } catch (err) {
        response.status(500).json("Something went wrong")
    }
}
export const getOrders = async (request: Request, response: Response): Promise<void> => {
    try {
        const page: string = request.params.page
        const offset: number = 10 * Number(page)
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
        const orders: { rows: Order[]; count: number } = await Order.findAndCountAll({
            order: [
                ['order_time', 'DESC'],
                ['order_id', 'ASC'],
            ],
            attributes: ['order_id', 'order_time', 'master_id', 'city_id', 'customer_id', 'isDone', 'work_id'],
            include: [{
                model: Master,
                as: "master",
                attributes: ['master_name']
            }, {
                model: City,
                as: 'city',
                attributes: ['city_name']
            }, {
                model: Customer,
                as: 'customer',
                attributes: ['customer_name']
            },
            ],
            where,
            offset,
            limit: 10
        })
        response.status(201).json(
            orders.rows
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const getOrderById = async (request: Request, response: Response): Promise<void> => {
    try {
        const {id} = request.params
        const order = Order.findOne({
            where: {
                order_id: id
            },
            attributes: ['order_id', 'order_time', 'master_id', 'city_id', 'customer_id', 'isDone', 'work_id'],
            include: [{
                model: Master,
                as: "master",
                attributes: ['master_name']
            }, {
                model: City,
                as: 'city',
                attributes: ['city_name']
            }, {
                model: Customer,
                as: 'customer',
                attributes: ['customer_name']
            },
            ],
        })
        response.status(201).json(
            order
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const getMasterOrders = async (request: Request, response: Response): Promise<void> => {
    try {
        const page: string = request.params.page
        const id: string = request.params.id
        const offset: number = 10 * Number(page)
        const orders = await Order.findAndCountAll({
            order: [
                ['order_time', 'DESC'],
                ['order_id', 'ASC'],
            ],
            include: [{
                model: City,
                as: 'city',
                attributes: ['city_name']
            }, {
                model: Customer,
                as: 'customer',
                attributes: ['customer_name']
            },
            ],
            where: {
                master_id: id
            },
            offset,
            limit: 10
        })
        response.status(201).json(orders.rows)
    } catch (e) {
        response.status(500).json("Something went wrong")
    }
}
export const getCustomerOrders = async (request: Request, response: Response): Promise<void> => {
    try {
        const page: string = request.params.page
        const id: string = request.params.id
        const offset: number = 10 * Number(page)
        const orders = await Order.findAndCountAll({
            order: [
                ['order_time', 'DESC'],
                ['order_id', 'ASC'],
            ],
            include: [{
                model: City,
                as: 'city',
                attributes: ['city_name']
            }, {
                model: Master,
                as: 'master',
                attributes: ['master_name']
            },
            ],
            where: {
                customer_id: id
            },
            offset,
            limit: 10
        })
        response.status(201).json(orders.rows)
    } catch (e) {
        response.status(500).json("Something went wrong")
    }
}

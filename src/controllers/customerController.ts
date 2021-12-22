import {Request, Response} from "express"
import {Customer} from "../database/models";

export const createCustomer = async (request: Request, response: Response): Promise<void> => {
    try {
        const customer: Customer = await Customer.create(
            request.body
        )
        response.status(201).json(
            customer
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const getCustomers = async (request: Request, response: Response): Promise<void> => {
    try {
        const page: string = request.params.page
        const offset: number = 10 * Number(page)
        const customers: { rows: Customer[]; count: number } = await Customer.findAndCountAll({
            order: [
                ["customer_id", "ASC"]
            ],
            offset,
            limit: 10
        })
        response.status(201).json(
            customers.rows
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}

export const getCustomerById = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id
        const customer: Customer | null = await Customer.findOne({
            where: {
                customer_id: id
            }
        })
        response.status(201).json(
            customer
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const deleteCustomerById = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id
        await Customer.destroy({
            where: {
                customer_id: id
            }
        })
        response.status(201).json(
            `Customer ${id} was removed successfully`
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const updateCustomerById = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id
        const customer_name: string = request.body.customer_name,
            customer_email: string = request.body.customer_email
        await Customer.update({
                customer_name, customer_email
            },
            {
                where: {
                    customer_id: id
                }
            })
        const customer: Customer | null = await Customer.findOne({
            where: {
                customer_id: id
            }
        })
        response.status(201).json(
            customer
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const getCustomerByEmail = async (request: Request, response: Response): Promise<void> => {
    try {
        const {email} = request.params
        const customer = Customer.findOne({
            where: {
                customer_email: email
            }
        })
        response.status(201).json(
            customer
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
import {Request, Response} from "express"
import {Type} from "../database/models";

export const createType = async (request: Request, response: Response): Promise<void> => {
    try {
        const type: Type = await Type.create(
            request.body
        )
        response.status(201).json(
            type
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}

export const getAllTypes = async (request: Request, response: Response): Promise<void> => {
    try {
        const types: Array<Type> | null = await Type.findAll({
            order: [
                ["work_id", "ASC"]
            ]
        })
        response.status(201).json(
            types
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const deleteTypeById = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id
        await Type.destroy({
            where: {
                work_id: id
            }
        })
        response.status(201).json(
            `Type ${id} was removed successfully`
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const updateType = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id
        const time: string = request.body.time,
            price: number = request.body.price
        await Type.update({
                time, price
            },
            {
                where:
                    {work_id: id}
            })
        const type: Type | null = await Type.findOne({
            where: {
                work_id: id
            }
        })
        response.status(201).json(
            type
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}

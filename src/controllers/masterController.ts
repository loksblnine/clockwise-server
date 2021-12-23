import {Request, Response} from "express"
import {CityToMaster, Master, Order} from "../database/models";
import {Op} from "sequelize"
import {IDepsInput} from "../database/models/cityToMaster";

export const createMaster = async (request: Request, response: Response): Promise<void> => {
    try {
        const master = await Master.create(
            request.body
        )
        response.status(201).json(
            master
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}

interface WhereType {
    master_name?: {
        [Op.iLike]: string
    }
}

export const getMasters = async (request: Request, response: Response): Promise<void> => {
    try {
        const where: WhereType = {}
        if (request?.query?.name?.length) {
            where.master_name = {[Op.iLike]: `%${request.query.name}%`}
        }
        const page: string = request.params.page
        const offset: number = 10 * Number(page)
        const masters = await Master.findAll({
            order: [
                ["master_id", "ASC"]
            ],
            where,
            offset,
            limit: 10,
            raw: true
        })
        const deps = await CityToMaster.findAll({
            raw: true
        })
        response.status(201).json(masters.map((master) => {
            return {
                ...master,
                deps: deps.filter((d: IDepsInput) => d.master_id === master.master_id).map((d: IDepsInput) => d.city_id)
            }
        }))
    } catch (e) {
        response.status(500).json("Something went wrong")
    }
}
export const getMasterById = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id
        const master = await Master.findOne({
            where: {
                master_id: id
            }
        })
        response.status(201).json(
            master
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const getFreeMasters = async (request: Request, response: Response): Promise<void> => {
    try {
        const {city_id, order_time, work_id} = request.body
        const startDate = new Date(order_time)
        const startHour = startDate.getHours()
        const finishHour = Number(work_id) + startHour
        const endDate = new Date(order_time).setHours(finishHour)
        const deps = await CityToMaster.findAll({
            attributes: ['city_id', 'master_id'],
            where: {
                city_id: city_id,
            },

            raw: true
        })
        const masters = []
        for (const dep of deps) {
            const orders: Array<Order> | null = await Order.findAll({
                where: {
                    master_id: dep.master_id,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    "order_time": {
                        [Op.between]: [startDate, endDate]
                    }
                },
                raw: true
            })
            if (!orders.length)
                masters.push(await Master.findOne({
                    where: {
                        master_id: dep.master_id
                    },
                    attributes: ['master_id', 'master_name', 'ranking']
                }))
        }
        response.status(201).json(masters)
    } catch (e) {
        response.status(500).json("Something went wrong")
    }
}
export const updateMaster = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id
        const master_name: string = request.body,
            email: string = request.body,
            ranking: string = request.body

        await Master.update({
            master_name, email, ranking
        }, {
            where:
                {master_id: id}
        })
        const master = await Master.findOne({
            where: {
                master_id: id
            },
            raw: true
        })
        const deps = await CityToMaster.findAll({
            where: {
                master_id: id
            },
            raw: true
        })
        response.status(201).json(
            {...master, deps: deps.map((d: CityToMaster) => d.city_id)}
        )
    } catch (err) {
        response.status(500).json("Something went wrong")
    }
}
export const deleteMaster = async (request: Request, response: Response): Promise<void> => {
    try {
        const {id} = request.params
        await Master.destroy({
            where: {
                master_id: id
            }
        })
        response.status(201).json(
            `Master ${id} was removed successfully`
        )
    } catch (err) {
        response.status(500).json("Something went wrong")
    }
}
export const getMasterByEmail = async (request: Request, response: Response): Promise<void> => {
    try {
        const master = await Master.findCreateFind({
                where: {email: request.params.email},
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                defaults: {
                    master_name: "Inactive Master",
                    email: request.params.email,
                    ranking: "5"
                },
            }
        )
        const deps = await CityToMaster.findAll({
            where: {
                master_id: master[0].master_id
            },
            raw: true
        })
        response.status(201).json(
            {master: master[0], deps: deps.map((d: CityToMaster) => d.city_id)}
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}

import {Request, Response} from "express"
import {City, Master, Order, Type} from "../database/models";
import {getDaysArray, IWhere, whereConstructor} from "../utils/utils";
import {Op} from "sequelize";

export const diagramByDays = async (request: Request, response: Response): Promise<void> => {
    try {
        const from = String(request.query.from)
        const to = String(request.query.to)
        if (from && to) {
            const where: IWhere = whereConstructor(request)
            const orders: Order[] | null = await Order.findAll({
                where
            })
            const days = getDaysArray(from, new Date(to))
            const respData = days.map(d => {
                return {
                    "date": d,
                    "Количество": orders.filter(o => o.order_time.toLocaleDateString() === d).length
                }
            })
            response.status(201).json(
                respData
            )
        } else {
            response.status(500).json("Something went wrong")
        }
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const diagramOrdersByCity = async (request: Request, response: Response): Promise<void> => {
    try {
        const from = String(request.query.from)
        const to = String(request.query.to)
        if (from && to) {
            const where: IWhere = whereConstructor(request)
            const orders: Order[] | null = await Order.findAll({
                where,
                include: [{
                    model: City,
                    as: 'city',
                    attributes: ['city_name']
                }],
                raw: true
            })
            const counts = orders.map(d => d["city.city_name"]).reduce((map: any, val: any) => {
                map[val] = (map[val] || 0) + 1;
                return map
            }, {})
            const respData = []
            let i = 0, sum: number = 0
            for (const [key, value] of Object.entries(counts).sort((a: any, b: any) => {
                return b[1] - a[1]
            })) {
                if (i < 3) {
                    respData.push({
                            name: key,
                            value
                        }
                    )
                } else {
                    sum += Number(value)
                }
                i++
            }
            respData.push({
                    name: "Другое",
                    value: sum
                }
            )
            response.status(201).json(
                respData
            )
        } else {
            response.status(500).json("Something went wrong")
        }
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const diagramOrdersByMaster = async (request: Request, response: Response): Promise<void> => {
    try {
        const from = String(request.query.from)
        const to = String(request.query.to)
        if (from && to) {
            const where: IWhere = whereConstructor(request)
            const orders: Order[] | null = await Order.findAll({
                where,
                include: [{
                    model: Master,
                    as: 'master',
                    attributes: ['master_name']
                }],
                raw: true
            })
            const counts = orders.map(d => d.master_id).reduce((map: any, val: any) => {
                map[val] = (map[val] || 0) + 1;
                return map
            }, {})
            const respData = []
            let i = 0, sum: number = 0
            for (const [key, value] of Object.entries(counts).sort((a: any, b: any) => {
                return b[1] - a[1]
            })) {
                if (i < 3) {
                    const master: Master | null = await Master.findOne({
                        where: {
                            master_id: key
                        },
                        raw: true
                    })
                    respData.push({
                            id: key,
                            name: master?.master_name,
                            value
                        }
                    )
                } else {
                    sum += Number(value)
                }
                i++
            }
            respData.push({
                    name: "Другое",
                    value: sum
                }
            )
            response.status(201).json(
                respData
            )
        } else {
            response.status(500).json("Something went wrong")
        }
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const diagramOrderTableByMaster = async (request: Request, response: Response): Promise<void> => {
    try {
        const from = String(request.query.from)
        const to = String(request.query.to)
        const masterIds = request.query.master_array
        let respData: any[] = []
        const works: Type[] | null = await Type.findAll()
        // @ts-ignore
        for (let masterId of masterIds) {
            const master_id = String(masterId)
            const where: IWhere = {}
            if (from && to && master_id) {
                where.order_time = {[Op.between]: [request.query.from, request.query.to]}
                where.master_id = Number(master_id)
                const orders: Order[] | null = await Order.findAll({
                    where: {
                        master_id
                    },
                    raw: true
                })
                const master: Master | null = await Master.findOne({
                    where: {
                        master_id
                    }
                })

                const sum1 = Number(orders.filter(o => o.work_id === 1 && o.isPaid).length) * Number(works?.find(w => w.work_id === 1)?.price)
                const sum2 = Number(orders.filter(o => o.work_id === 2 && o.isPaid).length) * Number(works?.find(w => w.work_id === 2)?.price)
                const sum3 = Number(orders.filter(o => o.work_id === 3 && o.isPaid).length) * Number(works?.find(w => w.work_id === 3)?.price)
                if (master?.master_name)
                    respData.push({
                        "Мастер": master?.master_name,
                        "Заработал": sum1 + sum2 + sum3,
                        "Количество": orders.length,
                        "Завершенные": orders.filter(o => o.isDone).length,
                        "Ждут выполнения": orders.filter(o => !o.isDone).length,
                        "Маленькие часы": orders.filter(o => o.work_id === 1).length,
                        "Средние часы": orders.filter(o => o.work_id === 2).length,
                        "Большие часы": orders.filter(o => o.work_id === 3).length,
                        "Рейтинг": master?.ranking
                    })
                else {
                    response.status(201).json(
                        respData
                    )
                }
            } else {
                response.status(500).json("Something went wrong")
            }
        }
        response.status(201).json(
            respData
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}

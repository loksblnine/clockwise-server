import {Request, Response} from "express"
import {City, Master, Order, Type} from "../database/models";
import {getDaysArray, IWhere, whereConstructor} from "../utils/utils";

export const diagram1 = async (request: Request, response: Response): Promise<void> => {
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
export const diagram2 = async (request: Request, response: Response): Promise<void> => {
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
export const diagram3 = async (request: Request, response: Response): Promise<void> => {
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
export const diagram4 = async (request: Request, response: Response): Promise<void> => {
    try {
        const from = String(request.query.from)
        const to = String(request.query.to)
        const master_id = String(request.query.master_id)
        if (from && to && master_id) {
            const where: IWhere = whereConstructor(request)
            const orders: Order[] | null = await Order.findAll({
                where
            })
            const works: Type[] | null = await Type.findAll()
            const sum1 = Number(orders.filter(o => o.work_id === 1).length) * Number(works?.find(w => w.work_id === 1)?.price)
            const sum2 = Number(orders.filter(o => o.work_id === 2).length) * Number(works?.find(w => w.work_id === 2)?.price)
            const sum3 = Number(orders.filter(o => o.work_id === 3).length) * Number(works?.find(w => w.work_id === 3)?.price)
            const respData = [{
                "Заработал": sum1 + sum2 + sum3,
                "Количество": orders.length,
                "Тип1": orders.filter(o => o.work_id === 1).length,
                "Тип2": orders.filter(o => o.work_id === 2).length,
                "Тип3": orders.filter(o => o.work_id === 3).length
            }]
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
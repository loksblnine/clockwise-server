import {Request, Response} from "express"
import {City} from "../database/models";

export const createCity = async (request: Request, response: Response): Promise<void> => {
    try {
        const city: City = await City.create(
            request.body
        )
        response.status(201).json(
            city
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}

export const getAllCities = async (request: Request, response: Response): Promise<void> => {
    try {
        const cities: Array<City> | null = await City.findAll({
            order: [
                ["city_id", "ASC"]
            ]
        })
        response.status(201).json(
            cities
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const getCityById = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id
        const city: City | null = await City.findOne({
            where: {
                city_id: id
            }
        })
        response.status(201).json(
            city
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const deleteCityById = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id
        await City.destroy({
            where: {
                city_id: id
            }
        })
        response.status(201).json(
            `City ${id} was removed successfully`
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const updateCity = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id
        const city_name: string = request.body.city_name
        await City.update({
                city_name
            },
            {
                where:
                    {city_id: id}
            })
        const city: City | null = await City.findOne({
            where: {
                city_id: id
            }
        })
        response.status(201).json(
            city
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}

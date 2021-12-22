import {Request, Response} from "express";
import {CityToMaster} from "../database/models";

export const createDependency = async (request: Request, response: Response): Promise<void> => {
    try {
        const connect = await CityToMaster.create(
            request.body
        );
        response.status(201).json(
            connect
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const getAllDeps = async (request: Request, response: Response): Promise<void> => {
    try {
        const deps: CityToMaster[] = await CityToMaster.findAll();
        response.status(201).json(
            deps
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const getMasterCities = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id;
        const deps: CityToMaster[] | null = await CityToMaster.findAll({
            where: {
                master_id: id
            }
        });
        response.status(201).json(
            deps.map((r: CityToMaster) => r.city_id)
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const getCityMasters = async (request: Request, response: Response): Promise<void> => {
    try {
        const id: string = request.params.id;
        const deps = await CityToMaster.findAll({
            where: {
                city_id: id
            }
        })
        response.status(201).json(
            deps.map((r: CityToMaster) => r.master_id)
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const deleteDependency = async (request: Request, response: Response): Promise<void> => {
    try {
        const city_id: string = request.body.city_id,
            master_id: string = request.body.city_id;
        await CityToMaster.destroy({
            where: {
                city_id, master_id
            }
        })
        response.status(201).json("Success!")
    } catch
        (err) {
        response.status(500).json("Something went wrong")
    }
}

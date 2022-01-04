import {Request, Response} from "express"
import {Photo} from "../database/models";

export const orderPhotos = async (request: Request, response: Response): Promise<void> => {
    try {
        const photos: Photo[] = await Photo.findAll({
            where: {
                order_id: request.params.id
            }
        })
        response.status(201).json(
            photos.map((item: Photo) => item.photo_url)
        );
    } catch (e) {
        response.status(500).json("Something went wrong");
    }
}

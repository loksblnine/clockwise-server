import {Request, Response} from "express"
import {Article} from "../database/models";
import cloud from "../utils/cloudinary";

export const createArticle = async (request: Request, response: Response): Promise<void> => {
    try {
        const article: Article = await Article.create({
                ...request.body, photo: null
            }
        )
        const fileStr = request.body?.photo;
        const uploadResponse = await cloud.uploader.upload(fileStr, {
            folder: `article_photos/article${article.article_id}`
        });
        await Article.update({
                photo: uploadResponse.secure_url
            },
            {
                where: {
                    article_id: article.article_id
                }
            }
        )
        response.status(201).json(
            article
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const getArticles = async (request: Request, response: Response): Promise<void> => {
    try {
        const page: string = request.params.page
        const offset: number = 10 * Number(page)
        const articles: Article[] = await Article.findAll({
            order: [
                ["article_id", "ASC"]
            ],
            offset,
            limit: 10
        })
        response.status(201).json(
            articles
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const deleteArticle = async (request: Request, response: Response): Promise<void> => {
    try {
        const id = Number(request.params.id)
        await cloud.api.delete_resources_by_prefix(`article_photos/article${id}`)
        await Article.destroy({
            where: {
                article_id: id
            }
        })
        response.status(201).json(
            "Success"
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}
export const editArticle = async (request: Request, response: Response): Promise<void> => {
    try {
        const id = Number(request.params.id)
        const header = request.body.header,
            body = request.body.body
        let photo = request.body?.photo
        if (photo) {
            await cloud.api.delete_resources_by_prefix(`article_photos/article${id}`)
            const fileStr = request.body?.photo;
            const uploadResponse = await cloud.uploader.upload(fileStr, {
                folder: `article_photos/article${id}`
            });
            photo = uploadResponse.secure_url
            await Article.update({
                photo
            }, {
                where: {
                    article_id: id
                }
            })
        }
        await Article.update({
            header, body
        }, {
            where: {
                article_id: id
            }
        })
        response.status(201).json(
            "Success"
        )
    } catch
        (e) {
        response.status(500).json("Something went wrong")
    }
}

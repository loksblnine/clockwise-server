import {Request, Response} from "express"
import {Article} from "../database/models";

export const createArticle = async (request: Request, response: Response): Promise<void> => {
    try {
        const article: Article = await Article.create(
            request.body
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

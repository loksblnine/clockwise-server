"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticles = exports.createArticle = void 0;
const models_1 = require("../database/models");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const createArticle = async (request, response) => {
    try {
        const article = await models_1.Article.create({
            ...request.body, photo: null
        });
        const fileStr = request.body?.photo;
        const uploadResponse = await cloudinary_1.default.uploader.upload(fileStr[0], {
            folder: `article_photos/article${article.article_id}`
        });
        await models_1.Article.update({
            photo: uploadResponse.secure_url
        }, {
            where: {
                article_id: article.article_id
            }
        });
        response.status(201).json(article);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.createArticle = createArticle;
const getArticles = async (request, response) => {
    try {
        const page = request.params.page;
        const offset = 10 * Number(page);
        const articles = await models_1.Article.findAll({
            order: [
                ["article_id", "ASC"]
            ],
            offset,
            limit: 10
        });
        response.status(201).json(articles);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getArticles = getArticles;
//# sourceMappingURL=blogController.js.map
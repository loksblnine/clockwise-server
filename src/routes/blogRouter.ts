import express from "express";
import * as blogController from "../controllers/blogController"
import {authMiddleware} from "../middleware/authMiddleware";

const blogRouter = express.Router();

blogRouter
    .route("/")
    .post(authMiddleware, blogController.createArticle)
blogRouter
    .route("/offset/:page")
    .get(blogController.getArticles)
export default blogRouter

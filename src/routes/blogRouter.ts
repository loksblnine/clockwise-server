import express from "express";
import * as blogController from "../controllers/blogController"
import {authMiddleware} from "../middleware/authMiddleware";

const blogRouter = express.Router();

blogRouter
    .route("/")
    .get(blogController.getArticles)
    .post(authMiddleware, blogController.createArticle)
export default blogRouter

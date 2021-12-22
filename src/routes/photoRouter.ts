import express from "express";
import * as photoController from "../controllers/photoController"

const photoRouter = express.Router();

photoRouter
    .route("/show/:id")
    .get(photoController.orderPhotos)

export default photoRouter

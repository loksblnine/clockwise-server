import express from "express";
import * as photoController from "../controllers/photoController"
import {authMasterMiddleware} from "../middleware/authMiddleware";

const photoRouter = express.Router();

photoRouter
    .route("/show/:id")
    .get(authMasterMiddleware, photoController.orderPhotos)

export default photoRouter

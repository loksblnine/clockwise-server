import express from "express";
import * as chartController from "../controllers/chartController"
import {authMiddleware} from "../middleware/authMiddleware";

const chartRouter = express.Router();

chartRouter
    .route("/1")
    .get(authMiddleware, chartController.diagram1)
chartRouter
    .route("/2")
    .get(authMiddleware, chartController.diagram2)
chartRouter
    .route("/3")
    .get(authMiddleware, chartController.diagram3)
chartRouter
    .route("/4")
    .get(authMiddleware, chartController.diagram4)


export default chartRouter

import express from "express";
import * as chartController from "../controllers/chartController"
import {authMiddleware} from "../middleware/authMiddleware";

const chartRouter = express.Router();

chartRouter
    .route("/orders-day")
    .get(authMiddleware, chartController.diagramByDays)
chartRouter
    .route("/orders-city")
    .get(authMiddleware, chartController.diagramOrdersByCity)
chartRouter
    .route("/orders-master")
    .get(authMiddleware, chartController.diagramOrdersByMaster)
chartRouter
    .route("/order-master-table")
    .get(authMiddleware, chartController.diagramOrderTableByMaster)


export default chartRouter

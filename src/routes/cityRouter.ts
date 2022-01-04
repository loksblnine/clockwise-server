import express from "express";
import * as cityController from "../controllers/cityController"
import {authMiddleware} from "../middleware/authMiddleware";

const cityRouter = express.Router();

cityRouter
    .route("/")
    .get(cityController.getAllCities)
    .post(authMiddleware, cityController.createCity)
cityRouter
    .route("/:id")
    .get(authMiddleware, cityController.getCityById)
    .put(authMiddleware, cityController.updateCity)
    .delete(authMiddleware, cityController.deleteCityById)

export default cityRouter

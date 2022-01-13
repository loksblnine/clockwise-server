import express from "express";
import * as typeController from "../controllers/typesController"
import {authMiddleware} from "../middleware/authMiddleware";

const typesRouter = express.Router();

typesRouter
    .route("/")
    .get(typeController.getAllTypes)
    .post(authMiddleware, typeController.createType)
typesRouter
    .route("/:id")
    .put(authMiddleware, typeController.updateType)
    .delete(authMiddleware, typeController.deleteTypeById)

export default typesRouter

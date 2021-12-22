import express from "express";
import * as depsController from "../controllers/depsController"
import {authMasterMiddleware, authMiddleware} from "../middleware/authMiddleware";

const depsRouter = express.Router();

depsRouter
    .route('/')
    .get(authMiddleware, depsController.getAllDeps)
    .delete(authMasterMiddleware, depsController.deleteDependency)
    .post(authMasterMiddleware, depsController.createDependency)
depsRouter
    .route('/city/:id')
    .get(authMiddleware, depsController.getCityMasters)
depsRouter
    .route('/master/:id')
    .get(authMasterMiddleware, depsController.getMasterCities)

export default depsRouter

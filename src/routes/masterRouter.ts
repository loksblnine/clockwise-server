import express from "express";
import * as masterController from "../controllers/masterController"
import {authMasterMiddleware, authMiddleware} from "../middleware/authMiddleware";

const masterRouter = express.Router();

masterRouter
    .route('/free')
    .post(masterController.getFreeMasters)
masterRouter
    .route("/")
    .post(authMasterMiddleware, masterController.createMaster)
masterRouter
    .route("/:id")
    .get(authMasterMiddleware, masterController.getMasterById)
    .put(authMasterMiddleware, masterController.updateMaster)
    .delete(authMiddleware, masterController.deleteMaster)
masterRouter
    .route("/email/:email")
    .get(authMasterMiddleware, masterController.getMasterByEmail)
masterRouter
    .route('/offset/:page')
    .get(authMasterMiddleware, masterController.getMasters)

export default masterRouter

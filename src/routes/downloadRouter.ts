import express from "express";
import * as downloadController from "../controllers/downloadController"
import {authCustomerMasterMiddleware, authMiddleware} from "../middleware/authMiddleware";

const downloadRouter = express.Router();

downloadRouter
    .route("/excel")
    .get(authMiddleware, downloadController.Excel)
downloadRouter
    .route("/pdf/:id")
    .get(authCustomerMasterMiddleware, downloadController.createReceipt)

export default downloadRouter

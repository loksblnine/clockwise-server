import express from "express";
import * as downloadController from "../controllers/downloadController"
import {authCustomerMasterMiddleware} from "../middleware/authMiddleware";

const downloadRouter = express.Router();

downloadRouter
    .route("/excel")
    .get(downloadController.Excel)
downloadRouter
    .route("/pdf/:id")
    .get(authCustomerMasterMiddleware, downloadController.createReceipt)

export default downloadRouter

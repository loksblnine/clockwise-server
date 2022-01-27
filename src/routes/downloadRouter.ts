import express from "express";
import * as downloadController from "../controllers/downloadController"

const downloadRouter = express.Router();

downloadRouter
    .route("/excel")
    .get(downloadController.Excel)
downloadRouter
    .route("/pdf/:id")
    .get(downloadController.createReceipt)

export default downloadRouter

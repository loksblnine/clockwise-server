import express from "express";
import * as userController from "../controllers/userController"
import {
    authCustomerMiddleware,
    authMasterMiddleware,
    authMiddleware,
    authRefreshMiddleware
} from "../middleware/authMiddleware";

const router = express.Router();

router
    .route('/register')
    .post(userController.registerUser)
router
    .route("/login")
    .post(userController.loginUser)
    .get(authRefreshMiddleware, userController.isTokenValid)
router
    .route("/approve-master/:id")
    .put(authMiddleware, userController.approveMaster)
router
    .route("/approve-user")
    .get(authMiddleware, userController.approveUser)
router
    .route("/approve-order/:id")
    .put(authMasterMiddleware, userController.approveOrder)
router
    .route("/set-mark/:id")
    .put(authCustomerMiddleware, userController.setMarkOrder)

export default router

import express from "express";
import * as userController from "../controllers/userController"
import {authCustomerMiddleware, authMasterMiddleware, authMiddleware} from "../middleware/authMiddleware";

const router = express.Router();

router
    .route('/register')
    .post(userController.registerUser)
router
    .route("/login")
    .post(userController.loginUser)
//get is token valid
router
    .route("/approve-master/:id")
    .put(authMiddleware, userController.approveMaster)//auth
router
    .route("/approve-user")
    .get(authMiddleware, userController.approveUser)//auth
router
    .route("/approve-order/:id")
    .put(authMasterMiddleware, userController.approveOrder)//auth master
router
    .route("/set-mark/:id")
    .put(authCustomerMiddleware, userController.setMarkOrder) //auth customer

export default router

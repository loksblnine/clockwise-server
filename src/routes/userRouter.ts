import express, {Request, Response} from "express";
import * as userController from "../controllers/userController"
import {isTokenValidGoogle} from "../controllers/userController"
import {
    authCustomerMiddleware,
    authMasterMiddleware,
    authMiddleware,
    authRefreshMiddleware,
    isLoggedInGoogle
} from "../middleware/authMiddleware";

const router = express.Router();
const passport = require('passport')
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
    .get(userController.approveUser)
router
    .route("/approve-order/:id")
    .put(authMasterMiddleware, userController.approveOrder)

//todo recalculate master ranking
router
    .route("/set-mark/:id")
    .put(authCustomerMiddleware, userController.setMarkOrder)

router
    .route("/google")
    .get(passport.authenticate('google', {scope: ['email', 'profile']}))
router
    .route("/google/callback")
    .get(passport.authenticate('google', {
        successRedirect: 'auth/google/protected',
        failureRedirect: '/failure'
    }))
router
    .route("/failure")
    .get((req, res) => {
        res.send('Failed to authenticate..');
    })
router
    .route('/google/auth/google/protected')
    .get(isLoggedInGoogle, isTokenValidGoogle)
router
    .route('/google/logout')
    .get((req: Request, res: Response) => {
        // @ts-ignore
        req.logout();
        // @ts-ignore
        req.session.destroy();
        res.send('Goodbye!');
    })
export default router

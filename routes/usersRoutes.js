const express = require("express");
let router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const authMasterMiddleware = require('../middleware/authMasterMiddleware')
const authCustomerMiddleware = require('../middleware/authCustomerMiddleware')
const usersController = require('../controllers/usersController')

router
    .route('/register')
    .post(usersController.registerUser)
router
    .route("/login")
    .post(usersController.loginUser)
    .get(authMiddleware, usersController.isTokenValid)
router
    .route("/approve-master/:id")
    .get(authMiddleware, usersController.approveMaster)
router
    .route("/approve-user")
    .get(authMiddleware, usersController.approveUser)
router
    .route("/approve-order/:id")
    .put(authMasterMiddleware, usersController.approveOrder)
router
    .route("/set-mark/:id")
    .put(authCustomerMiddleware, usersController.approveOrder)

module.exports = router
const express = require("express");
let router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const usersController = require('../controllers/usersController')

router
    .route('/register')
    .post(usersController.registerUser)
router
    .route("/login")
    .post(usersController.loginUser)
    .get(authMiddleware, usersController.isTokenValid)
module.exports = router
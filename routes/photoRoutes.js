const express = require("express");
let router = express.Router();
const photoController = require('../controllers/photoController')

router
    .route("/show/:id")
    .get(photoController.orderPhotos)

module.exports = router
const express = require("express");
let router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const citiesController = require('../controllers/citiesController')

router
    .route("/")
    .get(citiesController.getAllCities)
    .post(authMiddleware, citiesController.createCity)
router
    .route("/:id")
    .get(authMiddleware, citiesController.getCityById)
    .put(authMiddleware, citiesController.updateCity)
    .delete(authMiddleware, citiesController.deleteCity)

module.exports = router
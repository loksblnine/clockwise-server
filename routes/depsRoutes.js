const express = require("express");
let router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const authMasterMiddleware = require('../middleware/authMasterMiddleware')
const depsController = require('../controllers/depsController')

router
    .route('/')
    .get(authMiddleware, depsController.getAllDeps)
    .delete(authMasterMiddleware, depsController.deleteDependency)
    .post(authMasterMiddleware, depsController.createDependency)
router
    .route('/city/:id')
    .get(authMiddleware, depsController.getCityMasters)
router
    .route('/master/:id')
    .get(authMasterMiddleware, depsController.getMasterCities)

module.exports = router
const express = require("express");
let router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const authMasterMiddleware = require('../middleware/authMasterMiddleware')
const masterController = require('../controllers/mastersController')

router
    .route('/free')
    .post(masterController.getFreeMasters)
router
    .route("/")
    .post(authMiddleware, masterController.createMaster)
router
    .route("/:id")
    .get(authMiddleware, masterController.getMasterById)
    .put(authMiddleware, masterController.updateMaster)
    .delete(authMiddleware, masterController.deleteMaster)
router
    .route('/offset/:page')
    .get(masterController.getMasters)
router
    .route('/email')
    .post(authMasterMiddleware, masterController.getMasterByEmail)


module.exports = router
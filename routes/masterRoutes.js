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
    .post(authMasterMiddleware, masterController.createMaster)
router
    .route("/:id")
    .get(authMasterMiddleware, masterController.getMasterById)
    .put(authMasterMiddleware, masterController.updateMaster)
    .delete(authMiddleware, masterController.deleteMaster)
router
    .route("/email/:email")
    .get(authMasterMiddleware, masterController.getMasterByEmail)
router
    .route('/offset/:page')
    .get(authMasterMiddleware, masterController.getMasters)

module.exports = router
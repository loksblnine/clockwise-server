const express = require('express')
const router = express.Router()

const cityRoutes = require('../routes/cityRoutes')
const masterRoutes = require('../routes/masterRoutes')
const orderRoutes = require('../routes/orderRoutes')
const customerRoutes = require('../routes/customerRoutes')
const usersRoutes = require('../routes/usersRoutes')
const depsRoutes = require('../routes/depsRoutes')
const sendMailRoutes = require('../routes/sendMailRoute')

router.use("/cities", cityRoutes)
router.use("/masters", masterRoutes)
router.use("/orders", orderRoutes)
router.use("/customers", customerRoutes)
router.use("/deps", depsRoutes)
router.use("/send", sendMailRoutes)
router.use("/auth", usersRoutes)

module.exports = router
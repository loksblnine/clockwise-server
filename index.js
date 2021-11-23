const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

//region import routes
const cityRoutes = require('./routes/cityRoutes')
const masterRoutes = require('./routes/masterRoutes')
const orderRoutes = require('./routes/orderRoutes')
const customerRoutes = require('./routes/customerRoutes')
const usersRoutes = require('./routes/usersRoutes')
const depsRoutes = require('./routes/depsRoutes')
const sendMailRoutes = require('./routes/sendMailRoute')
//endregion
//region app.use
app.use(cors())
app.use(express.json())
app.use("/cities", cityRoutes)
app.use("/masters", masterRoutes)
app.use("/orders", orderRoutes)
app.use("/customers", customerRoutes)
app.use("/deps", depsRoutes)
app.use("/send", sendMailRoutes)
//TODO на фронте роуты изменить на +аус!!!
app.use("/auth/", usersRoutes)

app.use(express.static("static"));
//endregion

app.listen(process.env.PORT, () =>
    console.log(`server is started on port ${process.env.PORT}`)
)

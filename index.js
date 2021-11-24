const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const router = require('./routes/router')
const db = require('./database/config/config')

app.use(cors())
app.use(express.json())
app.use("/", router)
app.use(express.static("static"));

app.listen(process.env.PORT, () =>
    console.log(`server is started on port ${process.env.PORT}`)
)

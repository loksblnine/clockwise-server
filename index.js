const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const router = require('./routes/router')

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static("static"));
app.use("/", router)

app.listen(process.env.PORT, () =>
    console.log(`server is started on port ${process.env.PORT}`)
)

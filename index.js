const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config();

const pool = require("./db")

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SG_API_KEY)

const authMiddleware = require('./middleware/authMiddleware')
const authMasterMiddleware = require('./middleware/authMasterMiddleware')
const cityRoutes = require('./routes/cityRoutes')
const masterRoutes = require('./routes/masterRoutes')
const orderRoutes = require('./routes/orderRoutes')
const customerRoutes = require('./routes/customerRoutes')
const usersRoutes = require('./routes/usersRoutes')

app.use(cors())
app.use(express.json())
app.use("/cities", cityRoutes)
app.use("/masters", masterRoutes)
app.use("/orders", orderRoutes)
app.use("/customers", customerRoutes)
app.use("/auth/", usersRoutes)

app.use(express.static("static"));

//region send email
app.get('/send', async (request, response) => {
    try {
        response.json("This is route for sending mail")
    } catch (e) {
        response.json(e.toString())
    }
});
app.post('/send', function (req, res) {
    const msg = {
        to: req.body.email,
        from: process.env.USER,
        template_id: process.env.SG_TEMPLATE_ID_CONFIRM_ORDER,
        dynamic_template_data: {
            message: req.body.message
        }
    }
    sgMail
        .send(msg)
        .then((response) => {
            res.json({
                "success": true
            })
        })
        .catch((error) => {
            console.error(error)
        })
});
//endregion

//region login

//endregion
//region dependencies Master-City Many to Many
app.get('/deps', authMiddleware, async (request, response) => {
    try {
        const allDeps = await pool.query("SELECT * FROM connect_city_master ORDER BY master_id")
        response.json(allDeps.rows)
    } catch (e) {
        response.json(e.toString())
    }
})
app.get('/deps/city/:id', authMiddleware, async (request, response) => {
    try {
        const {id} = request.params;
        const mastersInCity = await pool.query("SELECT * FROM connect_city_master WHERE city_id = ($1)", [id])
        response.json(mastersInCity.rows.map(r => r.master_id))
    } catch (e) {
        response.json(e.toString())
    }
})
app.get('/deps/master/:id', authMasterMiddleware, async (request, response) => {
    try {
        const {id} = request.params;
        const masterCities = await pool.query("SELECT * FROM connect_city_master WHERE master_id = ($1)", [id])
        response.json(masterCities.rows.map(r => r.city_id))
    } catch (e) {
        response.json(e.toString())
    }
})
app.post('/deps', authMasterMiddleware, async (request, response) => {
    const {city_id, master_id} = request.body
    try {
        const newDeps = await pool.query("INSERT INTO connect_city_master (city_id, master_id) VALUES ($1, $2) RETURNING *",
            [city_id, master_id]);
        response.json(newDeps.rows[0])
    } catch (e) {
        response.json(e.toString())
    }
})
app.delete('/deps', authMasterMiddleware, async (request, response) => {
    const {city_id, master_id} = request.body
    try {
        await pool.query("DELETE FROM connect_city_master WHERE city_id = ($1) AND master_id = ($2)", [city_id, master_id])
        response.json("Город у мастера был удален")
    } catch (e) {
        response.json(e.toString())
    }
})
//endregion
app.listen(process.env.PORT, () =>
    console.log(`server is started on port ${process.env.PORT}`)
)

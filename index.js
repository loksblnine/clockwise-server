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

app.use(cors())
app.use(express.json())
app.use("/cities", cityRoutes)
app.use("/masters", masterRoutes)
app.use("/orders", orderRoutes)
app.use("/customers", customerRoutes)

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
const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {
            expiresIn: "2h",
        }
    );
}

app.post("/register", async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!(email && password)) {
            return res.status(400).send("Проверьте логин и пароль");
        }
        const encryptedPassword = await bcrypt.hash(password, 5);
        const newUser = await pool.query("INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *",
            [email, encryptedPassword, "MASTER"]);
        const token = generateJwt(newUser.user_id, email, "MASTER")
        return res.status(201).json({token});
    } catch (err) {
        res.status(500).json("Ошибка регистрации");
    }
});

app.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const oldUser = await pool.query("SELECT * FROM users WHERE email = ($1)", [email])
        const passwordMatch = await bcrypt.compare(password, oldUser.rows[0].password)
        if (oldUser && passwordMatch) {
            const token = generateJwt(oldUser.rows[0].user_id, oldUser.rows[0].email, oldUser.rows[0].role)
            return res.status(200).json({token});
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        res.json(err);
    }
});

app.get("/login", authMiddleware, (req, res) => {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    res.status(200).json({token});
})
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

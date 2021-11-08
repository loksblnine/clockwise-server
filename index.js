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

app.use(cors())
app.use(express.json())
app.use(express.static("static"));


//region validation
const validation = {};

validation.isNameValid = (name = "") => {
    return name.length && /^[A-ZА-Яa-zа-я -]+$/i.test(name);
}
validation.isRankingValid = (ranking = "") => {
    return ranking.length && Number(ranking) <= 5 && Number(ranking) >= 1;
}
validation.isEmailValid = (email = "") => {
    return email.length && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
}
validation.nowDate = () => {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2).toISOString().split('T')[0]
}

validation.finalDate = () => {
    return new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).toISOString().split('T')[0]
}
validation.isDateValid = (date = "") => {
    return date.length && date.split('T')[0] <= validation.finalDate() && date.split('T')[0] >= validation.nowDate() && Number(date.split('T')[1].split(':')[0]) <= 17 && Number(date.split('T')[1].split(':')[0]) >= 8;
}
//endregion

//region ROUTES
//region masters
app.post('/masters', async (request, response) => {
    const {master_name, ranking} = request.body
    if (validation.isNameValid(master_name))
        try {
            const newMaster = await pool.query("INSERT INTO masters (master_name, ranking) VALUES ($1, $2) RETURNING *",
                [master_name, ranking]);
            response.json(newMaster.rows[0])
        } catch (e) {
            response.json(e.toString())
        }
    else {
        response.json("Возникли трудности")
    }
})
app.get('/masters', async (request, response) => {
    try {
        const allMasters = await pool.query("SELECT * FROM masters ORDER BY master_id")
        response.json(allMasters.rows)
    } catch (e) {
        response.json(e.toString())
    }

})
app.get('/masters/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const master = await pool.query("SELECT * FROM masters WHERE master_id = ($1)", [id])
        response.json(master.rows[0])
    } catch (e) {
        response.json(e.toString())
    }
})

app.post('/masters/free/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const master = await pool.query("SELECT * FROM masters WHERE master_id = ($1)", [id])
        response.json(master.rows[0])
    } catch (e) {
        response.json(e.toString())
    }
})
app.put('/masters/:id', async (request, response) => {
    const {id} = request.params;
    const {master_name, ranking} = request.body
    if (validation.isNameValid(master_name))
        try {
            await pool.query(
                "UPDATE masters SET master_name = $2, ranking = $3 WHERE master_id = ($1)",
                [id, master_name, ranking])
            response.json("Обновления мастера сохранены")
        } catch (e) {
            response.json(e.toString())
        }
    else {
        response.json("Возникли трудности")
    }
})
app.delete('/masters/:id', async (request, response) => {
    try {
        const {id} = request.params;
        await pool.query("DELETE FROM masters WHERE master_id = ($1)", [id])
        response.json("Мастер удален")
    } catch (e) {
        response.json(e.toString())
    }
})
//endregion
//region cities
app.post('/cities', async (request, response) => {
    const {city_name} = request.body
    if (validation.isNameValid(city_name))
        try {
            const newCity = await pool.query("INSERT INTO cities (city_name) VALUES ($1) RETURNING *",
                [city_name]);
            response.json(newCity.rows[0])
        } catch (e) {
            response.json("Ошибка со стороны сервера")
        }
    else {
        response.json("Введите данные корректно")
    }
})
app.get('/cities', async (request, response) => {
    try {
        const allCities = await pool.query("SELECT * FROM cities ORDER BY city_id")
        response.json(allCities.rows)
    } catch (e) {
        response.json(e.toString())
    }
})
app.get('/cities/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const city = await pool.query("SELECT * FROM cities WHERE city_id = ($1)", [id])
        response.json(city.rows[0])
    } catch (e) {
        response.json(e.toString())
    }
})
app.put('/cities/:id', async (request, response) => {
    const {id} = request.params;
    const {city_name} = request.body
    if (validation.isNameValid(city_name))
        try {
            await pool.query(
                "UPDATE cities SET city_name = $2 WHERE city_id = ($1)",
                [id, city_name])
            response.json("Обновления города сохранены")
        } catch (e) {
            response.json(e.toString())
        }
    else {
        response.json("Возникли трудности")
    }
})
app.delete('/cities/:id', async (request, response) => {
    try {
        const {id} = request.params;
        await pool.query("DELETE FROM cities WHERE city_id = ($1)", [id])
        response.json("Город удален")
    } catch (e) {
        response.json(e.toString())
    }
})
//endregion
//region customers
app.post('/customers', async (request, response) => {
    const {customer_name, customer_email} = request.body
    if (validation.isNameValid(customer_name) && validation.isEmailValid(customer_email))
        try {
            const newCustomer = await pool.query("INSERT INTO customers (customer_name, customer_email) VALUES ($1, $2) RETURNING *",
                [customer_name, customer_email]);
            response.json(newCustomer.rows[0])
        } catch (e) {
            response.json(e.toString())
        }
    else {
        response.json("Возникли трудности")
    }
})
app.get('/customers', async (request, response) => {
    try {
        const allCustomers = await pool.query("SELECT * FROM customers ORDER BY customer_id")
        response.json(allCustomers.rows)
    } catch (e) {
        response.json(e.toString())
    }
})
app.get('/customers/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const customer = await pool.query("SELECT * FROM customers WHERE customer_id = ($1)", [id])
        response.json(customer.rows[0])
    } catch (e) {
        response.json(e.toString())
    }
})
app.get('/customers/email/:email', async (request, response) => {
    try {
        const {email} = request.params;
        const customer = await pool.query("SELECT * FROM customers WHERE customer_email = ($1)", [email])
        response.json(customer.rows[0])
    } catch (e) {
        response.json(e.toString())
    }
})

app.put('/customers/:id', async (request, response) => {
    const {id} = request.params;
    const {customer_name, customer_email} = request.body
    if (validation.isNameValid(customer_name) && validation.isEmailValid(customer_email))
        try {
            await pool.query(
                "UPDATE customers SET customer_name = $2, customer_email = $3 WHERE customer_id = ($1)",
                [id, customer_name, customer_email])
            response.json("Изменения данных покупателя сохранены")
        } catch (e) {
            response.json(e.toString())
        }
    else {
        response.json("Возникли трудности")
    }
})
app.delete('/customers/:id', async (request, response) => {
    try {
        const {id} = request.params;
        await pool.query("DELETE FROM customers WHERE customer_id = ($1)", [id])
        response.json("Покупатель был удален")
    } catch (e) {
        response.json(e.toString())
    }
})
//endregion
//region orders & send email
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

app.post('/orders', async (request, response) => {
    const order = request.body
    if (validation.isDateValid(order.order_time))
        try {
            const newOrder = await pool.query("INSERT INTO orders (customer_id, master_id, city_id, work_id, order_time) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [order.customer_id, order.master_id, order.city_id, order.work_id, order.order_time]);
            response.json(newOrder.rows[0])
        } catch (e) {
            response.json(e.toString())
        }
    else {
        response.json("Wrong order params")
    }
})
app.get('/orders', async (request, response) => {
    try {
        const allOrders = await pool.query("SELECT * FROM orders ORDER BY order_time DESC")
        response.json(allOrders.rows)
    } catch (e) {
        response.json(e.toString())
    }
})
app.get('/orders/offset/:page', async (request, response) => {
    try {
        const itemsPerPage = 5
        const page = request.params.page
        const offset = itemsPerPage * page
        const allOrders = await pool.query("SELECT * FROM orders ORDER BY order_id DESC LIMIT ($1) OFFSET ($2)", [itemsPerPage, offset])
        response.json(allOrders.rows)
    } catch (e) {
        response.json(e.toString())
    }
})
app.get('/orders/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const order = await pool.query("SELECT * FROM orders WHERE order_id = ($1)", [id])
        response.json(order.rows[0])
    } catch (e) {
        response.json(e.toString())
    }
})
app.put('/orders/:id', async (request, response) => {
    const {id} = request.params;
    const {customer_id, master_id, city_id, work_id, order_time} = request.body
    try {
        await pool.query(
            "UPDATE orders SET customer_id = $2, master_id = $3, city_id = $4, work_id = $5, order_time = $6 WHERE order_id = ($1)",
            [id, customer_id, master_id, city_id, work_id, order_time])
        response.json("Данные заказа были обновлены")
    } catch (e) {
        response.json(e.toString())
    }
})
app.delete('/orders/:id', async (request, response) => {
    try {
        const {id} = request.params;
        await pool.query("DELETE FROM orders WHERE order_id = ($1)", [id])
        response.json("Заказ удален")
    } catch (e) {
        response.json(e.toString())
    }
})
//endregion
//region Login
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
            [email, encryptedPassword, "ADMIN"]);
        const token = generateJwt(newUser.user_id, email, "ADMIN")
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

app.get("/login", authMiddleware, (req, res, next) => {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    res.status(200).json({token});
})
//endregion

app.get('/deps', async (request, response) => {
    try {
        const allDeps = await pool.query("SELECT * FROM connect_city_master ORDER BY master_id")
        response.json(allDeps.rows)
    } catch (e) {
        response.json(e.toString())
    }
})
app.get('/deps/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const masterCities = await pool.query("SELECT * FROM connect_city_master WHERE city_id = ($1)", [id])
        response.json(masterCities.rows)
    } catch (e) {
        response.json(e.toString())
    }
})
app.get('/deps/master/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const master = await pool.query("SELECT * FROM connect_city_master WHERE master_id = ($1)", [id])
        response.json(master.rows)
    } catch (e) {
        response.json(e.toString())
    }
})
app.post('/deps', async (request, response) => {
    const {city_id, master_id} = request.body
    try {
        const newDeps = await pool.query("INSERT INTO connect_city_master (city_id, master_id) VALUES ($1, $2) RETURNING *",
            [city_id, master_id]);
        response.json(newDeps.rows[0])
    } catch (e) {
        response.json(e.toString())
    }
})
app.delete('/deps', async (request, response) => {
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
module.exports = validation
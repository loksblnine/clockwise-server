const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
const pool = require("./db")
require("dotenv").config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SG_API_KEY)
//middleware
app.use(cors())
app.use(express.json())

//region ROUTES
//region masters
app.post('/masters', async (request, response) => {
    try {
        const {master_name, photo, ranking} = request.body
        const newMaster = await pool.query("INSERT INTO masters (master_name, photo, ranking) VALUES ($1, $2, $3) RETURNING *",
            [master_name, photo, ranking]);
        response.json(newMaster.rows[0])
    } catch (e) {
        console.log(e.toString())
    }
})
app.get('/masters', async (request, response) => {
    try {
        const allMasters = await pool.query("SELECT * FROM masters ORDER BY master_id")
        response.json(allMasters.rows)
    } catch (e) {
        console.log(e.toString())
    }

})
app.get('/masters/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const master = await pool.query("SELECT * FROM masters WHERE master_id = ($1)", [id])
        response.json(master.rows[0])
    } catch (e) {
        console.log(e.toString())
    }

})
app.put('/masters/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const {master_name, photo, ranking} = request.body
        await pool.query(
            "UPDATE masters SET master_name = $2, photo = $3, ranking = $4 WHERE master_id = ($1)",
            [id, master_name, photo, ranking])

        response.json("master was updated")
    } catch (e) {
        console.log(e.toString())
    }

})
app.delete('/masters/:id', async (request, response) => {
    try {
        const {id} = request.params;
        await pool.query("DELETE FROM masters WHERE master_id = ($1)", [id])
        response.json("Master was deleted")
    } catch (e) {
        console.log(e.toString())
    }
})
//endregion
//region cities
app.post('/cities', async (request, response) => {
    try {
        const {city_name} = request.body
        const newCity = await pool.query("INSERT INTO cities (city_name) VALUES ($1) RETURNING *",
            [city_name]);
        response.json(newCity.rows[0])
    } catch (e) {
        console.log(e.toString())
    }
})
app.get('/cities', async (request, response) => {
    try {
        const allCities = await pool.query("SELECT * FROM cities ORDER BY city_id")
        response.json(allCities.rows)
    } catch (e) {
        console.log(e.toString())
    }

})
app.get('/cities/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const city = await pool.query("SELECT * FROM cities WHERE city_id = ($1)", [id])
        response.json(city.rows[0])
    } catch (e) {
        console.log(e.toString())
    }

})
app.put('/cities/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const {city_name} = request.body
        await pool.query(
            "UPDATE cities SET city_name = $2 WHERE city_id = ($1)",
            [id, city_name])
        response.json("city was updated")
    } catch (e) {
        console.log(e.toString())
    }

})
app.delete('/cities/:id', async (request, response) => {
    try {
        const {id} = request.params;
        await pool.query("DELETE FROM cities WHERE city_id = ($1)", [id])
        response.json("City was deleted")
    } catch (e) {
        console.log(e.toString())
    }
})
//endregion
//region customers
app.post('/customers', async (request, response) => {
    try {
        const {customer_name, customer_email} = request.body
        const newCustomer = await pool.query("INSERT INTO customers (customer_name, customer_email) VALUES ($1, $2) RETURNING *",
            [customer_name, customer_email]);
        response.json(newCustomer.rows[0])
    } catch (e) {
        console.log(e.toString())
    }
})
app.get('/customers', async (request, response) => {
    try {
        const allCustomers = await pool.query("SELECT * FROM customers ORDER BY customer_id")
        response.json(allCustomers.rows)
    } catch (e) {
        console.log(e.toString())
    }

})
app.get('/customers/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const customer = await pool.query("SELECT * FROM customers WHERE customer_id = ($1)", [id])
        response.json(customer.rows[0])
    } catch (e) {
        console.log(e.toString())
    }

})

app.put('/customers/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const {customer_name, customer_email} = request.body
        await pool.query(
            "UPDATE customers SET customer_name = $2, customer_email = $3 WHERE customer_id = ($1)",
            [id, customer_name, customer_email])
        response.json("customer was updated")
    } catch (e) {
        console.log(e.toString())
    }
})
app.delete('/customers/:id', async (request, response) => {
    try {
        const {id} = request.params;
        await pool.query("DELETE FROM customers WHERE customer_id = ($1)", [id])
        response.json("Customer was deleted")
    } catch (e) {
        console.log(e.toString())
    }
})
//endregion
//region orders
function sendEmail(msg) {
    sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
            response.json({
                "success": true
            })
        })
        .catch((error) => {
            console.error(error)
            response.json({
                error,
                statusCode: 400
            })
        })
}

app.post('/orders', async (request, response) => {
    try {
        const order = request.body
        const newOrder = await pool.query("INSERT INTO orders (customer_id, master_id, city_id, work_id, order_time) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [order.customer_id, order.master_id, order.city_id, order.work_id, order.order_time]);

        const msg = {
            to: request.body.customer_email,
            from: process.env.USER,
            template_id: process.env.SG_TEMPLATE_ID_CONFIRM_ORDER,
            dynamic_template_data: {
                message: request.body.message
            }
        }
        sendEmail(msg)
        response.json(newOrder.rows[0])
    } catch (e) {
        console.log(e.toString())
    }

})
app.get('/orders', async (request, response) => {
    try {
        const allOrders = await pool.query("SELECT * FROM orders ORDER BY order_id")
        response.json(allOrders.rows)
    } catch (e) {
        console.log(e.toString())
    }
})
app.get('/orders/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const order = await pool.query("SELECT * FROM orders WHERE order_id = ($1)", [id])
        response.json(order.rows[0])
    } catch (e) {
        console.log(e.toString())
    }

})
app.put('/orders/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const {customer_id, master_id, city_id, work_id, order_time} = request.body
        await pool.query(
            "UPDATE orders SET customer_id = $2, master_id = $3, city_id = $4, work_id = $5, order_time = $6 WHERE order_id = ($1)",
            [id, customer_id, master_id, city_id, work_id, order_time])
        const msg = {
            to: request.body.email,
            from: process.env.USER,
            subject: 'Sending with SendGrid is Fun',
            template_id: process.env.SG_TEMPLATE_ID_CONFIRM_ORDER,
            dynamic_template_data: {
                message: request.body.message
            }
        }
        sendEmail(msg)
        response.json("order was updated")
    } catch (e) {
        console.log(e.toString())
    }
})
app.delete('/orders/:id', async (request, response) => {
    try {
        const {id} = request.params;
        await pool.query("DELETE FROM orders WHERE order_id = ($1)", [id])
        response.json("Order was deleted")
    } catch (e) {
        console.log(e.toString())
    }
})
//endregion
//region Login

app.post("/register", async (req, res) => {
    // Our register logic starts here
    try {
        // Get user input
        const {email, password} = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("Проверьте логин и пароль");
        }
                //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 5);

        // Create user in our database
        const newUser = await pool.query("INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *",
            [email, encryptedPassword, "ADMIN"]);
        // Create token
        const token = jwt.sign(
            {newUser},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        newUser.token = token;
        // return new user
        res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
    }
});

app.post("/login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const oldUser = await pool.query("SELECT * FROM users WHERE email = ($1)", [email])

        if (oldUser && (await bcrypt.compare(password, oldUser.password))) {
            // Create token
            const token = jwt.sign(
                {oldUser},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            oldUser.token = token;
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});

//endregion

//endregion

app.listen(process.env.PORT, () =>
    console.log(`server is started on port ${process.env.PORT}`)
)
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../database/models");
const sequelize = require("../database/config/config");

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SG_API_KEY)

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {
            expiresIn: "2h",
        }
    );
}

const registerUser = async (request, response) => {
    try {
        const {email, password, role} = request.body;
        if (!(email && password)) {
            return response.status(400).send("Invalid credentials");
        }
        const encryptedPassword = await bcrypt.hash(password, 5);
        const newUser = await models.initModels(sequelize).user.create({
            email, password: encryptedPassword, role
        })
        const token = generateJwt(newUser.user_id, email, role)
        switch (role) {
            case 1: {
                break;
            }
            case 2: {
                await models.initModels(sequelize).master.create({
                    master_name: "Inactive Master", email: email, ranking: 5
                })
                break;
            }
            case 3: {
                await models.initModels(sequelize).customer.create({
                    customer_name: "Inactive Customer", customer_email: email
                })
                break;
            }
            default: {
                break;
            }
        }
        return response.status(201).json({token});
    } catch (err) {
        response.status(500).json("Something went wrong");
    }
}
const loginUser = async (request, response) => {
    try {
        const {email, password} = request.body;
        if (!(email && password)) {
            response.status(400).send("All input is required");
        }
        const oldUsers = await models.initModels(sequelize).user.findAll({
            where: {
                email, isActive: true
            },
            raw: true
        })
        for (let i = 0; i<oldUsers.length; i++) {
            const passwordMatch = await bcrypt.compare(password,oldUsers[i]?.password)
            if (oldUsers[i] && passwordMatch) {
                const token = generateJwt(oldUsers[i]?.user_id, oldUsers[i]?.email, oldUsers[i]?.role)
                return response.status(200).json({token});
            }
        }
        response.status(400).send("Invalid Credentials");
    } catch (err) {
        response.status(500).send(err.toString());
    }
}
const isTokenValid = (request, response) => {
    const token = generateJwt(request.user.id, request.user.email, request.user.role)
    response.status(200).json({token});
}
const approveMaster = async (request, response) => {
    try {
        const {id} = request.params
        await models.initModels(sequelize).master.update({
                isApproved: true
            },
            {
                where:
                    {master_id: id}
            })
        const master = await models.initModels(sequelize).master.findOne({
            where: {
                master_id: id
            }
        })
        const LINK = process.env.NODE_ENV === "production" ? (process.env.PROD_FRONT_URL) : (process.env.DEV_FRONT_URL)
        const msg = {
            to: master.email,
            from: process.env.USER,
            template_id: process.env.SG_TEMPLATE_ID_ACCOUNT_APPROVE,
            dynamic_template_data: {
                link: LINK
            }
        }
        sgMail
            .send(msg)
            .then(() => {
                response.status(201).json("Success!")
            })
            .catch(() => {
                response.status(500).json("Something went wrong")
            })
        response.status(201).json("Success")
    } catch (e) {
        response.status(500).send("Something went wrong");
    }
}
const approveUser = async (request, response) => {
    try {
        const token = request.headers.authorization.split(' ')[1]
        if (!token) {
            return response.status(401).json({message: "Не авторизован"})
        }
        const {activated} = jwt.verify(token, process.env.SECRET_KEY)
        const user = await models.initModels(sequelize).user.update({
                isActive: true
            },
            {
                where:
                    {email: activated}
            })
        const newToken = jwt.sign(
            {user: user.id, email: user.email, role: user.role},
            process.env.SECRET_KEY,
            {
                expiresIn: "2h",
            }
        )
        response.status(201).json({token: newToken})
    } catch (e) {
        response.status(500).send("Something went wrong");

    }
}
const approveOrder = async (request, response) => {
    try {
        const {id} = request.params
        await models.initModels(sequelize).order.update({
            isDone: true
        }, {
            raw: true,
            where:
                {order_id: id}
        })
        const order = await models.initModels(sequelize).order.findOne({
            where: {
                order_id: id
            }
        })
        const customer = await models.initModels(sequelize).customer.findOne({
            where: {
                customer_id: order.customer_id
            }
        })
        const master = await models.initModels(sequelize).master.findOne({
            where: {
                master_id: order.master_id
            }
        })
        const LINK = process.env.NODE_ENV === "production" ? (process.env.PROD_FRONT_URL) : (process.env.DEV_FRONT_URL)
        const msg = {
            to: customer.customer_email,
            from: process.env.USER,
            template_id: process.env.SG_TEMPLATE_ID_FINISH_ORDER,
            dynamic_template_data: {
                master_name: master.master_name,
                order_id: id,
                link: LINK
            }
        }
        sgMail
            .send(msg)
            .then(() => {
                response.status(201).json("Success!")
            })
            .catch(() => {
                response.status(500).json("Something went wrong")
            })
        response.status(201).json("Success")
    } catch (e) {
        response.status(500).send("Something went wrong");
    }
}
const setMarkOrder = async (request, response) => {
    try {
        const {id} = request.params
        await models.initModels(sequelize).order.update({
            mark: request.body.mark
        }, {
            where:
                {order_id: id}
        })
        response.status(201).json("Success")
    } catch (e) {
        response.status(500).send("Something went wrong");
    }
}

module.exports = {
    registerUser,
    loginUser,
    isTokenValid,
    approveMaster,
    approveOrder,
    approveUser,
    setMarkOrder
}
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../database/models");
const sequelize = require("../database/config/config");

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
                    master_name: "Inactive Master", email, ranking: 5
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
        const oldUser = await models.initModels(sequelize).user.findOne({
            where: {
                email
            },
            raw: true
        })
        const passwordMatch = await bcrypt.compare(password, oldUser.password)
        if (oldUser && passwordMatch) {
            const token = generateJwt(oldUser.user_id, oldUser.email, oldUser.role)
            return response.status(200).json({token});
        }
        response.status(400).send("Invalid Credentials");
    } catch (err) {
        response.status(500).send("Something went wrong");
    }
}

const isTokenValid = (request, response) => {
    const token = generateJwt(request.user.id, request.user.email, request.user.role)
    response.status(200).json({token});
}

module.exports = {
    registerUser,
    loginUser,
    isTokenValid
}
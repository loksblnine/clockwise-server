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

const registerUser = async (req, res) => {
    try {
        const {email, password, role = 2} = req.body;
        if (!(email && password)) {
            return res.status(400).send("Проверьте логин и пароль");
        }
        const encryptedPassword = await bcrypt.hash(password, 5);
        const newUser = await models.initModels(sequelize).user.create({
            email, password: encryptedPassword, role
        })
        console.log(newUser)
        const token = generateJwt(newUser.user_id, email, 2)
        return res.status(201).json({token});
    } catch (err) {
        res.status(500).json("Ошибка регистрации");
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const oldUser = await models.initModels(sequelize).user.findOne({
            where: {
                email
            }
        })
        const passwordMatch = await bcrypt.compare(password, oldUser.password)
        if (oldUser && passwordMatch) {
            const token = generateJwt(oldUser.user_id, oldUser.email, oldUser.role)
            return res.status(200).json({token});
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        res.json(err);
    }
}

const isTokenValid = (req, res) => {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    res.status(200).json({token});
}

module.exports = {
    registerUser,
    loginUser,
    isTokenValid
}
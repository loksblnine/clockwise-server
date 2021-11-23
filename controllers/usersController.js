const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
}

const loginUser = async (req, res) => {
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
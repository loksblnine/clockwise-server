const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        req.user = jwt.verify(token, process.env.SECRET_KEY)
        if (req.user.role === 3 || req.user.role === 1) {
            next()
        } else {
            return res.status(401).json({message: "Не авторизован"})
        }
    } catch (e) {
        return res.status(401).json({message: "Не авторизован"})
    }
}

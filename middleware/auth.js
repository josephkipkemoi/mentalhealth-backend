const jwt = require("jsonwebtoken")

module.exports = function(req, res, next) {
    const token = req.header("x-auth-token")

    if(!token) {
        return res.status(401).json({ message: "Token not available, authorization denied" })
    }

    try {
        const decoded = jwt.verify(token, "zenconnect_key")
        req.user = decoded.user
        next()
    } catch (e) {
        res.status(401).json({ message: "Token is not valid" })
    }
}
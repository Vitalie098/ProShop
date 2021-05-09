const jwt = require("jsonwebtoken")
const User = require("../models/users")

const protect = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try{
            token = req.headers.authorization.split(" ")[1]
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
        } catch (e) {
            res.status(401).json({ message: "Not authorized, token failed"})
        }
    }

    if(!token){
        res.status(401).json({message: "Not authorized, token null"})
    }

    next()
}

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).json({message: "Not authorized as an admin"})
    }
}

module.exports = {protect, admin}
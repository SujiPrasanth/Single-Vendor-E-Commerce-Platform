import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const verifytoken = (req, res, next) => {
    try {
        const token = req.cookies?.token
        if (!token) {
            return res.status(401).json({ msg: "Login Required" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch (err) {
        console.log("JWT ERROR:", err.message)
        return res.status(401).json({ msg: "Invalid token" })
    }
}

export const isuser = async (req, res, next) => {
    try {
        console.log(req.user)
        if(!req.user){
            return res.status(403).json({ msg: "login Required" });
        }
        if (req.user.role !== "User") {
            return res.status(403).json({ msg: "Access denied User only" });
        }
        next()
    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err })
    }
}

export const isadmin = async (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(403).json({ msg: "Access denied Admin only" });
        }
        next()
    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err })
    }
}
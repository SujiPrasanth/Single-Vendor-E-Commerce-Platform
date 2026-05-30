import Selleruser from "../models/sellerschema.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const selleruser = (async (req, res) => {

    try {
        const { selleremail, sellerpassword } = req.body;
        const existingSeller = await Selleruser.findOne({ selleremail });
        if (existingSeller) {
            return res.status(400).json({ message: "Seller already exists" });
        }

        const newselleruser = await Selleruser.create({ selleremail, sellerpassword });

        return res.status(201).json({ message: "Signup successful", newselleruser });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})


export const getselleruser = async (req, res) => {
    try {
        const { selleremail, sellerpassword } = req.body;

        const seller = await Selleruser.findOne({ selleremail });

        if (!seller) {
            return res.status(404).json({ message: "User not found" });
        }

        const ismatch = await seller.comparepassword(sellerpassword);

        if (!ismatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                id: seller._id,
                role: seller.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "Login successful",
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const sellerlogout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })

        return res.status(200).json({ success: true, msg: "Logout Successful" });

    } catch (err) {
        return res.status(500).json({ msg: "Server Error" })
    }
}
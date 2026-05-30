import User from '../models/userschema.js';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const createuser = async (req, res) => {
  try {
    const { useremail, password } = req.body;

    const existinguser = await User.findOne({ useremail })
    if (existinguser) {
      return res.status(409).json({ message: "User already exists" })
    }
    const newuser = await User.create({ useremail, password });

    res.status(201).json({ msg: "Signup Successfully", newuser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getuser = async (req, res) => {
  try {
    const { useremail, password } = req.body;

    const user = await User.findOne({ useremail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const ismatch = await user.comparepassword(password);

    if (!ismatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const secret = process.env.JWT_SECRET
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      secret,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Login successful",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    return res.status(200).json({ success: true, msg: "Logout Successful" });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" })
  }
}
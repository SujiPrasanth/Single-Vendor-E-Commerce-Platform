import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userschema = new mongoose.Schema({
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "User",
        required:true
    }
}, { timestamps: true })

userschema.pre("save", async function() {
    if (!this.isModified("password")) return 

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    
})

userschema.methods.comparepassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password)
}

const User = mongoose.model("User", userschema)

export default User


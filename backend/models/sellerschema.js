import mongoose from "mongoose";
import bcrypt from "bcrypt"
const sellerschema= new mongoose.Schema(
    {
        selleremail:{
            type:String,
            unique:true,
            required:true
        },
        sellerpassword:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true,
            default:"Admin"
        }
    }
)

sellerschema.pre("save", async function() {
    if (!this.isModified("sellerpassword")) return 

    const salt = await bcrypt.genSalt(10)
    this.sellerpassword = await bcrypt.hash(this.sellerpassword, salt)
    
})

sellerschema.methods.comparepassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.sellerpassword)
}


const Selleruser = mongoose.model("Seller",sellerschema)
export default Selleruser
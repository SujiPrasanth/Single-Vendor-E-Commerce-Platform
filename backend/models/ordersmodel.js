import mongoose from "mongoose"

const orderschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    delivery: {
        name: String,
        phone: String,
        address: String
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    totalamount: {
        type: Number,
        required: true
    },
    razorpay_order_id: {
        type: String
    },
    razorpay_payment_id: {
        type: String
    },
    status: {
        type: String,
        enum: ["created", "paid", "failed", "refunded"],
        default: "created"
    },
    deliverystatus: {
        type: String,
        enum:["pending","placed", "shipped", "outfordelivery", "delivered"]
    },
    
}, { timestamps: true })


const Order = mongoose.model("Order", orderschema)

export default Order
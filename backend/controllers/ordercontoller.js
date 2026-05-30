import Order from "../models/ordersmodel.js"
import dotenv from "dotenv"
dotenv.config()
import { razorpay } from "../utils/razorpay.js"
import Productdetails from "../models/productschema.js"
import crypto from "crypto"


export const createorder = async (req, res) => {
    try {
        const userid = req.user.id
        console.log(req.body)
        console.log(req.user)

        const { productId, delivery, quantity } = req.body
        if (!productId || !quantity) {
            return res.status(400).json({ msg: "Missing details" })
        }
        const product = await Productdetails.findById(productId)
        console.log(product)
        if (!product) {
            return res.status(404).json({ msg: "Product not found" })
        }
        const baseprice = product.price
        const discount = product.discount || 0
        const finalprice = baseprice - (baseprice * discount) / 100
        const total = Math.round( finalprice * quantity)

        const options = {
            amount: Math.round(total * 100),
            currency: "INR",
        }

        const order = await razorpay.orders.create(options)

        await Order.create({
            userId: userid, productId: productId,
            razorpay_order_id: order.id,
            price: baseprice,
            totalamount: total,
            quantity: quantity, delivery: delivery,
            status: "created", deliverystatus: "pending"
        })

        return res.status(200).json({ success: true, orderId: order.id, amount: order.amount })

    } catch (err) {
        console.error("CREATE ORDER ERROR:", err)
        return res.status(500).json({ msg: "Server Error" })
    }
}


export const getkey = async (req, res) => {
    try {
        return res.status(200).json({ key: process.env.RAZORPAY_KEY_ID })
    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err })
    }
}


export const paymentverification = async (req, res) => {
    try {
        
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        const body = razorpay_order_id + '|' + razorpay_payment_id

        const expectedsignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex")

        if (expectedsignature === razorpay_signature) {
            await Order.findOneAndUpdate({ razorpay_order_id }, {
                status: "paid", deliverystatus: "placed",
                razorpay_payment_id
            })
            return res.json({ success: true, msg: "Payment Verified", })

        } else {
            return res.status(400).json({
                success: false,
                msg: "Invalid signature",
            })
        }

    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err })
    }
}

export const paymentfailed = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body

        await Order.findOneAndUpdate(
            { razorpay_order_id },
            { status: "failed" }
        )

        return res.json({ success: true, msg: "Payment marked as failed" })
    } catch (err) {
        return res.status(500).json({ msg: "Server Error" })
    }
}


export const getorders = async (req, res) => {
    try {
        const order = await Order.find().populate("userId", "useremail").populate("productId", "productName price").sort({ createdAt: -1 })
        console.log(order)
        return res.status(200).json({ msg: "order fetched", order })
    } catch (err) {
        return res.status(500).json({ msg: "Server Error" })
    }
}

export const updateorder = async (req, res) => {
    try {
        const { id } = req.params
        const { deliverystatus } = req.body

        const validstatus = ["pending", "placed", "shipped", "outfordelivery", "delivered"]

        if (!validstatus.includes(deliverystatus)) {
            return res.status(404).json({ msg: "Invalid Order Status" })
        }

        const order = await Order.findByIdAndUpdate(id, { deliverystatus: deliverystatus }, { returnDocument: "after" })
        await order.populate("userId")
        await order.populate("productId")

        if (!order) {
            return res.status(404).json({ msg: "Order Not Found" })
        }

        return res.status(200).json({ success: true, msg: "Order Status Updated Successfully", order })
    } catch (err) {
        return res.status(500).json({ msg: "Server error", err })
    }
}


export const getuserorders = async (req, res) => {
    try {
        const userId = req.user.id

        const orders = await Order.find({ userId }).sort({ createdAt: -1 })
            .populate("productId", "productName productimage finalprice discount")
            .select("productId quantity price totalamount status razorpay_payment_id deliverystatus createdAt")
        if (!orders || orders.length === 0) {
            return res.status(404).json({ msg: "No orders found" })
        }
        console.log(orders)
        return res.status(200).json({msg: "Orders fetched", orders})

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Server Error" })
    }
}
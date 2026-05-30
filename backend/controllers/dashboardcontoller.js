import Order from "../models/ordersmodel.js"
import User from "../models/userschema.js"
import Product from "../models/productschema.js"

export const dashboard = async (req, res) => {
    try {
        const revenuedata = await Order.aggregate([
            { $match: { status: "paid" } },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalamount" }
                }
            }
        ])
        const totalrevenue = revenuedata.length > 0 ? revenuedata[0].total : 0
        const totalorders = await Order.countDocuments({ status: "paid" })
        const totalfailedorders = await Order.countDocuments({ status: "failed" })
        const totalusers = await User.countDocuments()
        const totalproducts = await Product.countDocuments()


        const recentorders = await Order.find().limit(5).sort({ createdAt: -1 }).select("_id totalamount status createdAt")
        const recentbuyers = await Order.find().sort({ createdAt: -1 }).limit(5).populate("userId", "useremail").select("userId createdAt status delivery")

        const totalrevenuemonth = await Order.aggregate([
            {
                $match: {
                    status: "paid",
                    createdAt: {
                        $gte: new Date(new Date().getFullYear(), 0, 1)
                    }
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    total: { $sum: "$totalamount" }
                }
            }, {
                $sort: { "_id.month": -1 }
            }
        ])

        const totalrevenueyear = await Order.aggregate([
            {
                $match: { status: "paid" }
            },
            {
                $group: {
                    _id: { year: { $year: "$createdAt" } },
                    total: { $sum: "$totalamount" }
                }
            },
            { $sort: { "_id.year": -1 } }
        ])

        const higheststock = await Product.findOne().sort({ stockItem: -1 }).select("productName stockItem")

        const loweststock = await Product.findOne({ stockItem: { $gt: 0 } }).sort({ stockItem: 1 }).select("productName stockItem")

        return res.status(200).json({
            msg: "Data Fetched",
            totalrevenue,
            totalorders,
            totalfailedorders,
            totalproducts,
            totalusers, recentorders, recentbuyers,
            totalrevenuemonth, totalrevenueyear,
            higheststock, loweststock

        })
    } catch (err) {
        return res.status(500).json({ msg: "Server Error" })
    }
}
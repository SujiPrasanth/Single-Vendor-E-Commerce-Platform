import Order from "../models/ordersmodel.js"


export const getcustomer = async(req,res)=>{
    try{
        console.log("verfrify")
        const customer = await Order.find({},"userId productId delivery deliverystatus status")
        console.log(customer)
        if(customer.length===0){
            return res.status(404).json({msg:"No customer Found"})
        }
        return res.status(200).json({msg:"Customer Fetched",customer})
        
    }catch(err){
        return res.status(500).json({msg:"Server error",err})
    }
}
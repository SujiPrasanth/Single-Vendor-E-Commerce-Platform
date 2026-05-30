import Productdetails from "../models/productschema.js";


export const getcategoryproducts = async(req,res)=>{
    try{
        const {category}=req.params

        const products = await Productdetails.find({category})
        if(!products){
            return res.status(400).json({msg:"No Prodcuts Found"})
        }
        return res.status(200).json({msg:"Products Fetched",products})
    }catch(err){
        return res.status(500).json({msg:"Server Error",err})
    }
}

export const singleproduct = async (req, res) => {
    try {
        const { id } = req.params
        

        const product = await Productdetails.findById(id)

        if (!product) {
            return res.status(404).json({ msg: "Product not found" })
        }

        return res.status(200).json({msg: "Product fetched",product })

    } catch (err) {
        console.log("ERROR:", err)
        return res.status(500).json({ msg: "Server Error", err: err.message })
    }
}
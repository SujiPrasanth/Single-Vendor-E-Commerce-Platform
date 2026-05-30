import Productdetails from "../models/productschema.js"
import multer from "multer"
import path from "path"
import fs from 'fs'


if (!fs.existsSync("uploads/products")) {
  fs.mkdirSync("uploads/products", { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

export const upload = multer({ storage })

export const addproduct = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const sellerId = req.user.id

    const {
      productName,
      category,
      price,
      discount,
      stockItem,
      productAvailable,
      shortDescription,
      description,
    } = req.body

    const pricenum = Number(price)
    const discountnum = Number(discount) || 0
    const available = productAvailable === "true"

    if (isNaN(pricenum) || pricenum <= 0) {
      return res.status(400).json({ message: "Valid price is required" })
    }

    if (discountnum < 0 || discountnum > 100) {
      return res.status(400).json({ message: "Discount must be 0–100" })
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is Required" })
    }

    const finalprice = Math.round(pricenum - (pricenum * discountnum) / 100)

    const productimage = `uploads/products/${req.file.filename}`

    const product = await Productdetails.create({
      productName,
      category,
      price: pricenum,
      finalprice,
      discount: discountnum,
      stockItem,
      productAvailable: available,
      shortDescription,
      description,
      productimage,
      sellerId
    })

    return res.status(201).json({message: "Product Successfully Added",product})

  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}


export const getproducts = (async (req, res) => {
  try {
    const sellerId = req.user.id
    if (!sellerId) return res.status(400).json({ message: "Seller ID required" })
    const getproducts = await Productdetails.find({ sellerId })
    return res.status(200).json({ getproducts })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})


export const geteditproduct = (async (req, res) => {
  try {
    const { id } = req.params
    const product = await Productdetails.findById(id)
    if (!product) {
      return res.status(400).json({ message: "Product Not Found" })
    }
    return res.status(200).json({ product })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
})

export const updateeditproduct = async (req, res) => {
  try {
    const { id } = req.params

    const {
      productName,
      category,
      price,
      discount,
      stockItem,
      productAvailable,
      shortDescription,
      description
    } = req.body

    const pricenum = Number(price)
    const discountnum = Number(discount) || 0

    if (!pricenum || pricenum <= 0) {
      return res.status(400).json({ message: "Invalid price" })
    }

    if (discountnum < 0 || discountnum > 100) {
      return res.status(400).json({ message: "Invalid discount" })
    }

    const finalprice = Math.round(pricenum - (pricenum * discountnum) / 100)

    const updateData = {
      productName,
      category,
      price: pricenum,
      discount: discountnum,
      finalprice,
      stockItem,
      productAvailable,
      shortDescription,
      description
    }

    if (req.file) { updateData.productimage = `uploads/products/${req.file.filename}` }

    const updatedProduct = await Productdetails.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" })
    }

    return res.status(200).json({ message: "Product updated successfully", updatedProduct })

  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}


export const deleteproduct = async (req, res) => {
  try {
    const { id } = req.params

    const product = await Productdetails.findById(id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    if (product.productimage) {
      const imagePath = path.join(process.cwd(), product.productimage)

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    }

    await Productdetails.findByIdAndDelete(id)

    return res.status(200).json({ message: "Product deleted successfully" })

  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}



export const getallproducts = async (req, res) => {
  try {
    const products = await Productdetails.find().sort({ createdAt: -1 })
    return res.status(200).json({ products })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

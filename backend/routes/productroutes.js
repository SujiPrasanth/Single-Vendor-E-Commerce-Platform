import express from "express"
import { getcategoryproducts, singleproduct } from "../controllers/userproductscontroller.js"
import { getallproducts } from "../controllers/productcontroller.js"

const router = express.Router()


router.get('/category/:category',getcategoryproducts)
router.get('/product/:id',singleproduct)


router.get('/getallproducts',getallproducts)
export default router
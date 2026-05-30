import express from "express"
import { isadmin, verifytoken } from "../middleware/auth.js"
import { addproduct ,deleteproduct,geteditproduct,getproducts,updateeditproduct,upload} from "../controllers/productcontroller.js"

const router = express.Router()

router.post('/addproduct',verifytoken,isadmin,upload.single("productImage"), addproduct)
router.get('/getproducts',verifytoken,isadmin,getproducts)
router.get("/products/:id", verifytoken,isadmin,geteditproduct)
router.put( "/updateproduct/:id",upload.single("productImage"),updateeditproduct);
router.delete("/product/:id", deleteproduct)
export default router
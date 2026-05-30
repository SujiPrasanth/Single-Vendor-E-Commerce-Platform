import express from "express"
import { verifytoken ,isuser} from "../middleware/auth.js"
import { addtocart, getcart, removecart, updatequantity } from "../controllers/cartcontroller.js"
const router = express.Router()

router.post('/addtocart',verifytoken,isuser,addtocart)
router.get('/getcart',verifytoken,getcart)
router.delete('/deleteproduct/:productId',verifytoken,removecart)
router.patch('/updatequantity',verifytoken,isuser,updatequantity)

export default router
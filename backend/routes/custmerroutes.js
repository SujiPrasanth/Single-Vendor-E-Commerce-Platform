import express from "express"
import { verifytoken } from "../middleware/auth.js"
import { getcustomer } from "../controllers/getcustomercontroller.js"
const router = express.Router()

router.get('/getcustomers',verifytoken,getcustomer)

export default router
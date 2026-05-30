import express from "express"
import { isuser, verifytoken } from "../middleware/auth.js"
import { createorder, getkey, getorders, getuserorders, paymentfailed, paymentverification, updateorder } from "../controllers/ordercontoller.js"

const router = express.Router()

router.post('/createorder',verifytoken,createorder)
router.get('/getkey',verifytoken,getkey)
router.post('/verifypayment',verifytoken,paymentverification)
router.post('/paymentfailed', verifytoken, paymentfailed)

router.get('/getorders',verifytoken,getorders)
router.patch('/updatedeliverystatus/:id',verifytoken,updateorder)

router.get('/getuserorders',verifytoken,isuser,getuserorders)
export default router
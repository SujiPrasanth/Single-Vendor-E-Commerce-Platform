import express from 'express'
import { createuser, getuser, logout } from '../controllers/usercontroler.js'
import { selleruser, getselleruser, sellerlogout } from '../controllers/sellercontroller.js'
import { isuser } from '../middleware/auth.js'
const router = express.Router()

router.post('/signup', createuser)
router.post('/login', getuser)

router.post('/sellersignup', selleruser)
router.post('/sellerlogin', getselleruser)

router.post('/logout', logout)
router.post('/sellerlogout',sellerlogout)

export default router
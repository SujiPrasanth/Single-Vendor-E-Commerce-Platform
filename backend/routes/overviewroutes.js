import express from "express"
import { dashboard } from "../controllers/dashboardcontoller.js"

const router = express.Router()

router.get('/overview',dashboard)


export default router
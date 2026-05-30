import express from 'express';
import mongoose from 'mongoose';
import cors from "cors"
import dotenv from "dotenv"
import userrouter from './routes/routes.js'
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';
import productroutes from "./routes/productroutes.js"
import cartroutes from "./routes/cartroutes.js"
import sellerroutes from "./routes/sellerroutes.js"
import orderroutes from "./routes/orderroutes.js"
import customeroutes from "./routes/custmerroutes.js"
import overviewroutes from "./routes/overviewroutes.js"

dotenv.config()
const app = express()
app.use(cors({
    origin: "https://single-vendor-e-commerce-platform.vercel.app",
    credentials: true
}))
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Db is Connected Succesfully")
    }).catch((err) => {
        console.log(`Error is Occured ${err}`)
    })

app.use('/api', userrouter)
app.use('/api', productroutes)
app.use('/api', cartroutes)
app.use('/api', sellerroutes)
app.use('/api', orderroutes)
app.use('/api', customeroutes)
app.use('/api', overviewroutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})

import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './database/connection.js';
import authRouter from './Routers/authRouter.js';
import cookieParser from 'cookie-parser';
import adminRouter from './Routers/adminRouter.js';
import { authMiddleware } from './Middleware/authMiddleware.js';
import ticketRoute from './Routers/ticketRouter.js';

dotenv.config();
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req,res) => {
    res.status(200).json({ msg: "server is running in port 8080"});
});

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/admin", adminRouter );

app.use("/api/v1/tickets",authMiddleware,ticketRoute)

app.listen(port, () =>{
    connectDB();
    console.log("your server is running in port",port);
})
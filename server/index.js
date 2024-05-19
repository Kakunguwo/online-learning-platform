import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const{PORT} = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOrigin ={
    origin:'http://localhost:5173',
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);



mongoose.connect("mongodb://127.0.0.1:27017/onlineLearningPlatformDB")
    .then(()=> {
        app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));
    })
    .catch(err => console.log(err));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


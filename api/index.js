import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to mongodb')
    })
    .catch((error) => {
        console.log(error);
    })

const __dirname = path.resolve();


const app = express();

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => res.send("Express on Vercel"));


app.listen(3001, () => {
    console.log('Server is running on port 3001')
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })


// defining middleware for responding to errors
app.use((error, request, response, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';
    return response.status(statusCode).json({
        'success': false,
        statusCode, 
        message 
    });
});
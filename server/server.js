import path from 'path';
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToMongoDb from "./db/connectToMongoDb.js";
import {app, server} from './socket/socket.js'


dotenv.config();
app.use(express.json());
app.use(cookieParser());
const PORT=process.env.PORT || 5000;


const __dirname=path.resolve();



app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes);
app.use(express.static(path.join(__dirname,"client/dist")));

app.get("*",(req,res)=>{
       res.sendFile(path.join(__dirname,"client","dist","index.html"))
})

server.listen(PORT,()=>{
       connectToMongoDb();       
       console.log(`listening on ${PORT}`)
}
);
import express from "express";
import mongoose from "mongoose";

import userRouter from "./routes/userRoute.js";  
import dotenv from "dotenv";
dotenv.config(); // Add this at the top of your file

const app = express();
app.use(express.json());

const dbuser = encodeURIComponent(process.env.DBUSER)
const dbpass = encodeURIComponent(process.env.DBPASS)


// mongoose.connect(`mongodb://${dbuser}:${dbpass}@localhost:27017/merncafe`).then(()=>
// {
//     app.listen(8080,()=>{
//     console.log("Server Started");
// });
// });

mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.ofp3gkf.mongodb.net/merncafe?retryWrites=true&w=majority&appName=Cluster0`).then(()=>
{
    app.listen(8080,()=>{
    console.log("Server Started");
});
});




app.use("/api/users",userRouter);


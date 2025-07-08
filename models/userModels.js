import mongoose from "mongoose";
import express from "express";
const app=express();

//User Schema
const userSchema=mongoose.Schema( 
    {
    firstName:{type: String},
    lastName:{type:String},
    email:{type:String, unique:true},
    password:{type:String},
    role:{type:String, default:"user"},
    status:{type:String, default:"active"}
    },
    {timestamps: true}                  
);

app.use(express.json());

export default mongoose.model("User",userSchema);
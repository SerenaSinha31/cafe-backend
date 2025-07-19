import bcrypt from "bcrypt";
import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
const SECRET = "sometext";

const register= async(req,res)=>{
try{

    const {firstName,lastName,email,password}=req.body;
    const hashedPwd = await bcrypt.hash(password,10);

    const user ={
        firstName,
        lastName,
        email,
        password:hashedPwd,
    };
    const result = await userModel.create(user);
    res.status(201).json(result);
}
catch(err){
    console.log(err);
    res.status(500).json({message: "Something went wrong"});
}
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch) {
        const userObj = {
          id: existingUser._id,
          firstName: existingUser.firstName,
          email: existingUser.email,
          role: existingUser.role,
        };
        const token = jwt.sign(userObj, SECRET, { expiresIn: "1h" });
        res.status(200).json({ ...userObj, token });
      } else {
        res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// const login=async (req,res)=>{
//     try{
//         const {email,password}=req.body;
//         const existingUser = await userModel.findOne({email});

//         if(existingUser){
//             const isMatch = await bcrypt.compare(password,existingUser.password);

//             if(isMatch){
//                 const userObj ={username:existingUser.username,email:existingUser.email,role:existingUser.role};
//                 const token = jwt.sign(userObj,SECRET,{expiresIn:"1h"});
//                 res.status(200).json({user:userObj,token});
//             }else{
//                 res.status(400).json({message: "Invalid Password"});
//             }
//         }else{
//             res.status(400).json({message: "User not found"});
//         }


//     }catch(err){
//         console.log(err);
//         res.status(500).json({message: "Something went wrong"});
//     }
// } 

// const showusers=async(req,res)=>{
//     try{
//         const{ page=1,limit=3}= req.query;
//         const result = await userModel.find().skip((page-1)).limit(limit);
//        // const result = await userModel.find();
//         res.status(200).json(result);
//     }catch(err){
//         console.log(err);
//         res.status(400).json({message:"Something went wrong"});
//     }
    
// }
const showusers = async (req, res) => {
  try {
    const { page = 1, limit = 3, search = "" } = req.query;
    const skip = (page - 1) * limit;
    const count = await userModel.countDocuments({ firstName: { $regex: search, $options: "i" } });
    const total = Math.ceil(count / limit);
    const users = await userModel
      .find({ firstName: { $regex: search, $options: "i" } })
      .skip(skip)
      .limit(limit)
      .sort({updatedAt:-1})
    res.status(200).json({ users, total });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const updateUser=async(req,res)=>{
    try{
    const id=req.params.id;
    const body=req.body;
    const result =await userModel.findByIdAndUpdate(id,body);
    res.status(200).json(result);
}catch(err){
    console.log(err);
    res.status(400).json({message:"Something went wrong"});
}
}

const deleteUser=async(req,res)=>{
    try{
    const id=req.params.id;
    const result = await userModel.findByIdAndDelete(id);
    res.status(200).json(result);}
    catch(err){
        console.log(err);
        res.status(400).json({message:"Something went wrong"});
    }
}

const profileUser=async(req,res)=>{
    try{
    const id=req.params.id;
    const result = await userModel.findOne({_id:id});
    res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Something went wrong"});
    }
 }
const addUser = async (req, res) => {
  try {
    const body = req.body;
    const hashedpwd = await bcrypt.hash(body.password, 10);
    body.password = hashedpwd;
    const result = await userModel.create(body);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
 export {register,login,showusers,updateUser,deleteUser,profileUser,addUser};
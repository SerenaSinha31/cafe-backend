import jwt from "jsonwebtoken";
const SECRET="sometext";

//middlewares
const authenticate=(req,res,next)=>{
try
    {
    let token =req.headers.authorization;
    token=token.split(" ")[1];
    const user = jwt.verify(token,SECRET);
    req.role = user.role;
    next();    
    }
catch(err)
    {
       return res.json({message: "ACCESS DENIED"});
    }
}
const authorize=(role)=>{
    return (req,res,next) =>{
        if(req.role==role){
            next();
        }else{
         return res.json({message: "ACCESS DENIED"});   
        }
    }; 
}

export {authenticate, authorize}; 
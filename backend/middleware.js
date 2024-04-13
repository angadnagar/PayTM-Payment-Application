const jwt=require("jsonwebtoken");
const { jwtsecret } = require("./config");

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message:"Authheader does not exist"
        });
    }

    const token=authHeader.split(' ')[1];

    try{
        const decoded=jwt.verify(token,jwtsecret)
         
        if(decoded.userId){
        req.userId=decoded.userId;
        next();
        }
        else{
            return res.status(403).json({
                message:"User not exists"
            });
        }
    }
    catch(err){
        return res.status(403).json({
            message:"Error"
        });
    }

    
}

module.exports={
    authMiddleware
}
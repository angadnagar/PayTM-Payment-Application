const express=require("express");
const zod=require("zod");
const jwt=require("jsonwebtoken");
const { User, Account } = require("../db");
const { jwtsecret } = require("../config");
const { authMiddleware } = require("../middleware");

const router=express.Router();

const signUpSchema=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),

});


//signup
router.post("/signup",async (req,res)=>{
    
    const body=req.body;
    const {success}=signUpSchema.safeParse(body);
    
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    
    const user=User.findOne({
        username:body.username
    })
    
    if(user._id){
        return res.status(411).json({
            message: "User already exists"
        })
    }
    
    const dbUser=await User.create(body);
    const userId=dbUser._id;

    const account=await Account.create({
        userId,
        balance:1+Math.random()*10000
    })
    
    const token=jwt.sign({
        userId
    },jwtsecret);
    
    res.status(200).json({
        message: "User created successfully",
        token: token
    })
});

//signin

const signInSchema=zod.object({
    username:zod.string().email(),
    password:zod.string().min(6),

});

router.post("/signin",async (req,res)=>{
    const body=req.body;
    const {success}=signInSchema.safeParse(body);

    if(!success){
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const user=await User.findOne({
        username:body.username,
        password:body.password
    })

    
    if(user){
        const token=jwt.sign({
            userId:user._id
        },jwtsecret);
        return res.status(200).json({
            token:token
        })
    }

    return res.status(411).json({
        message:"Error while logging in"
    })
})

//update

const updatedSchema=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),

})

router.put("/",authMiddleware,async (req,res)=>{
    const {success}=updatedSchema.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({ _id:req.userId},req.body);

    res.json({
        message: "Updated Successfully"
    })
})

//get users

router.get("/bulk",async (req,res)=>{
     const filter=req.query.filter || "";
    const users=await User.find({
        $or:[
            {
               firstName:{"$regex":filter}
            },
            {
                lastName:{"$regex":filter}
            } 
        ]
    });

    if(users){
        res.status(200).json({
            users:users.map(user=>({
               username:user.username,
               firstName:user.firstName,
               lastName:user.lastName,
               _id:user._id
            }))
        })
    }

    else{
        res.status(403).json({
            message:"no user found"
        })
    }
})

module.exports=router;
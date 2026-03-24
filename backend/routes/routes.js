const express = require("express");
const router  = express.Router();
const user = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


router.post("/register",async (req,res)=>{
    try{
    const {email, password} = req.body;
    if(!email||!password){
        return res.json("all fields required");
    }

    const existuser = await user.findOne({email:email});
    if(existuser){
        return res.json("user is already existed");
    }

    const hashpassword = await bcrypt.hash(password,10);

    const newuser = new user({
        email:email,
        password:hashpassword
    });
    await newuser.save();

    res.status(200).json("you have sucessfuly registerd");


}
catch(err){
    res.status(500).json("you can't register")
    
}


   
});



router.post("/login",async(req,res)=>{
    try{

        const {email,password}= req.body;
        if(!email||!password){
            return res.json("All fields required");
        }

        const registerduser = await user.findOne({email:email});
        if(!registerduser){
            return res.json("invalid credentials");
        }

        const ismatch = await bcrypt.compare(password , registerduser.password);

        if(!ismatch){
            return res.json("incorrect password");
        }

         const token = jwt.sign(
            {
                id:registerduser._id,
                email:registerduser.email
            },
             "secretkey",
            { expiresIn: "1m" }
         )

           res.json({message: "Login successful",token: token});

    }
    catch(err){
       res.status(500).json("login failed") 
    }
})



module.exports= router;
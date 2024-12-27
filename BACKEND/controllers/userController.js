const User = require("../models/user.js")
const passport = require('passport')

const registerUser = async(req,res)=>{
    const {username,email,password} = req.body
    let newUser= new User({
        username:username,
        email:email,
    })
 
    try{
        let registeredUser = await User.register(newUser,password);
        res.status(200).send({success:true,mas:"User Signed Up Successfully ", data: registeredUser});
    }
    catch(err){
        res.status(400).send({success:false,msg:'User does not sign up successfully',error:err.message})
    }

}

const loginUser = (req, res) => {
    if (req.isAuthenticated()) { 
        console.log("Logged-in User:", req.user);
        
        res.status(200).send({
            success: true,
            message: "Logged in successfully",
            data: req.user
        });
    } else {
        res.status(401).send({ success: false, message: "Login failed" });
    }
};


const logOut = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err)
        }
    })
    console.log(req.user)
    res.send({success:true,message:"Logout Successfully"})
}

module.exports = {
    registerUser,
    loginUser,
    logOut,
}
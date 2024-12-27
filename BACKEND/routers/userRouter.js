const express = require('express')
const useRouter = express.Router()
const bodyParser = require('body-parser')
const {registerUser,loginUser,logOut} = require("../controllers/userController.js")
const passport = require('passport')


useRouter.use(express.json());
useRouter.use(express.urlencoded({ extended: true }));

useRouter.post("/signup",registerUser)
useRouter.post("/login",passport.authenticate("local",{ failureRedirect: "/login", failureFlash: true }),loginUser)
useRouter.get("/logout",logOut)

module.exports = useRouter


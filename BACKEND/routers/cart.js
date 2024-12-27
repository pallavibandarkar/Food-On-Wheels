const express = require('express')
const cartRouter = express.Router()
const path = require('path')
const bodyParser = require('body-parser')
cartRouter.use(bodyParser.json())
cartRouter.use(bodyParser.urlencoded({extended:true}))
const {isCustomer }= require("../middleware.js")

const {addToCart,getCartItems} = require("../controllers/cartController.js")

cartRouter.post("/addToCart",isCustomer,addToCart)
cartRouter.get("/getCart/:id",isCustomer,getCartItems)

module.exports = cartRouter
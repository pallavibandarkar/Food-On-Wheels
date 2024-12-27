const express = require('express')
const orderRouter = express.Router()
const path = require('path')
const bodyParser = require('body-parser')
orderRouter.use(bodyParser.json())
orderRouter.use(bodyParser.urlencoded({extended:true}))
const {placeOrder,getOrders,getUserOrders} = require("../controllers/orderController.js")
const {isCustomer} = require("../middleware.js")

orderRouter.post('/placeOrder',isCustomer,placeOrder)
orderRouter.get('/getOrders',isCustomer,getOrders)
orderRouter.get('/:id',isCustomer,getUserOrders)

module.exports = orderRouter
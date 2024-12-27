const express = require('express');
const Order = require('../models/order.js');
const adminOrderRouter = express.Router();
const {getOrders, updateOrder,fetchFoodTruck,showMenu,updateMenu,getMenuItem,createMenu,deleteMenu,updateFoodTruck} = require("../controllers/adminController.js")
const {isAdmin }= require("../middleware.js")
const multer = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})

adminOrderRouter.use(express.json());
adminOrderRouter.use(express.urlencoded({ extended: true }));



adminOrderRouter.get('/orders/:id',isAdmin, getOrders);
adminOrderRouter.put('/updateOrders/:id',isAdmin,updateOrder);
adminOrderRouter.get("/fetchData/:id",isAdmin,fetchFoodTruck)
adminOrderRouter.get("/:id",isAdmin,showMenu)
adminOrderRouter.post("/updateMenu/:id",isAdmin,upload.single('image'),updateMenu)
adminOrderRouter.get("/getMenuItem/:id",isAdmin,getMenuItem)
adminOrderRouter.post("/addMenu/:id",isAdmin,upload.single('image'),createMenu)
adminOrderRouter.delete("/deleteItem/:id",isAdmin,deleteMenu)
adminOrderRouter.post("/updateFoodTruck/:id",isAdmin,upload.single('image'),updateFoodTruck)

module.exports = adminOrderRouter;

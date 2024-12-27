const express = require('express')
const router = express.Router()
const multer = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})
const path = require('path')
const {isCustomer} = require('../middleware.js')

const {createFoodTruck,showFooDTruck,showMenu,fetchFoodTruck,} = require('../controllers/foodTruckController.js')

const bodyParser = require('body-parser')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/add",upload.single('image'),createFoodTruck)

router.get("/show",showFooDTruck)

router.get("/:id",isCustomer,showMenu)

router.get("/fetchData/:id",isCustomer,fetchFoodTruck)

module.exports=router
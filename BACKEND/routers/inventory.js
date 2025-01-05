const express = require('express')
const router = express.Router()
const {spiceRouteExpress , spiceREMenu} = require("../utils/data.js")
const Inventory = require("../models/inventory.js")
const Menu = require("../models/menu.js")
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/add",async(req,res)=>{
    try{
        const result =await Inventory.insertMany(spiceRouteExpress)
        console.log(result)
        console.log("Inventory was initialized")
        res.send({data:result})
    }
    catch(err){
        console.log(err)
    }
})

router.get("/addIng",async(req,res)=>{
    try{
        for(let menu of spiceREMenu){
            let data = await Menu.findById(menu._id)
            data.ingredients = menu.ingredients;
            const result = await data.save()
            console.log(result)
        }
    }
    catch(err){
        console.log(err)
    }
})



module.exports = router

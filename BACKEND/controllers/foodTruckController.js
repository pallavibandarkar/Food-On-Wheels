const FoodTruck = require("../models/foodTruck.js")
const axios = require('axios');
const path = require('path')
const Menu = require("../models/menu.js")
const User = require("../models/user.js");
const { error } = require("console");


const getCoordinates = async (address) => {
    const apiKey = process.env.OPENCAGE_API_KEY; // Your OpenCage API Key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const result = response.data.results[0]; // Take the first result
        if (result) {
            const { lat, lng } = result.geometry;
            return { lat, lng };
        }
        return null;
    } catch (error) {
        console.error('Geocoding Error:', error);
        return null;
    }
};

const createFoodTruck = async(req,res)=>{
    try{
        let {name,schedule,location,category} = req.body;
        let url = req.file.path;
        let filename = req.file.filename
    
        const foodTruck = new FoodTruck({
            name:name,
            schedule:schedule,
            location:location,
            category:category,
            image:{
                url:url,
                filename:filename
            }
        })
        const data = await foodTruck.save()
        res.status(200).send({success:true,msg:"Food Truck Saved Successfully",data:data})
    
    }
    catch(err){
        res.status(400).send({success:false,msg:"Food Truck Saved Successfully",err:err})
    }
    
}

const showFooDTruck=async(req,res)=>{
    try{
        const data = await FoodTruck.find();
        // for (const truck of data) {
        //     const coordinates = await getCoordinates(truck.location); // Get coordinates for the food truck location

        //     if (coordinates) {
        //         truck.geomerty = {
        //             type: 'Point',
        //             coordinates: [coordinates.lng, coordinates.lat],
        //         };
        //         await truck.save(); // Save the updated food truck document
        //         console.log(`Updated coordinates for ${truck.name}`);
        //     } else {
        //         console.log(`Failed to geocode ${truck.name} at ${truck.location}`);
        //     }
        // }

        // console.log('Coordinates update complete.');
        res.status(200).send({success:true,msg:"Food Truck Saved Successfully",data:data})
    }
    catch(err){
        res.status(400).send({success:false,msg:"Food Truck Saved Successfully",err:err})
    }
}


const showMenu = async(req,res)=>{
    try{
        
        let {id} = req.params
        const result = await FoodTruck.findById(id).populate('menu'); 
    
        res.status(200).send({success:true,msg:"Fetched all the menu items of a food truck",data:result})
    }
    catch(err){
        console.log("Error Occured File fecthing menu details")
        res.status(400).send({success:false,msg:"got a error while fetchin data items",data:err.message})
    }

}

const fetchFoodTruck= async(req,res)=>{
    try{
        const {id} = req.params
        const result = await FoodTruck.findById(id)
        res.status(200).send({success:true,data:result})
    }
    catch(err){
        res.status(400).send({success:false,error:err.message})   
    }

}



module.exports = {
    createFoodTruck,
    showFooDTruck,
    showMenu,
    fetchFoodTruck,
}
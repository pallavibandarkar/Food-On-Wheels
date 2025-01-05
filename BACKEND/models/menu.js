const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const FoodTruck = require("./foodTruck.js")

const menuSchema = new Schema({
    foodtruck:{
        type:Schema.Types.ObjectId,
        ref:'FoodTruck'
    },
    name:{
        type:String,
        required:true,
    },
    
    price:{
        type:Number,
        required:true
    },
    image:{
        url:String,
        filename:String,
    },
    ingredients:[{
        ingredient:{
            type:String,
        },
        quantity:{
            type:Number
        },
        unit:{
            type:String,
        }
    }]
})

const Menu = mongoose.model('Menu',menuSchema)

module.exports = Menu
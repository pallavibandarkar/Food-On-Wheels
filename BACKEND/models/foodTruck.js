const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Menu = require('./menu.js')
const User = require('./user.js')

const foodTruckSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    geomerty:{
        type:{
            type:String,
            enum:['Point'],
            
        },
        coordinates:{
            type:[Number]
        }
    },
    schedule:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    image:{
        url:String,
        filename:String,
    },
    category:{
        type:String,
        enum:['Indian','Jain','Veg','Mexican','Barbecue','Desserts','Continental','Indian Street Food','American Fast Food',
            'Healthy','Wraps & Rolls','Indian Snacks']
    },
    menu:[
        {
            type:Schema.Types.ObjectId,
            ref:"Menu"
        }
    ],
    admin:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const FoodTruck = mongoose.model('FoodTruck',foodTruckSchema)

module.exports = FoodTruck;
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose') 
const FoodTruck = require('./foodTruck.js')

const userSchema = Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        enum:['customer','admin'],
        default:'customer'
    },
    foodTruck:{
        type:Schema.Types.ObjectId,
        ref:"FoodTruck"
    }
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',userSchema)
module.exports = User;
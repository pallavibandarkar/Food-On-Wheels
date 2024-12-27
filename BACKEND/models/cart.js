const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Menu = require('./menu.js')
const User = require('./user.js')
const FoodTruck = require('./foodTruck.js')

const cartSchema= Schema({
    customer:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    foodTruck:{
        type:Schema.Types.ObjectId,
        ref:'FoodTruck',
    },
    items:[
        {
            menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
            quantity: { type: Number, required: true },
        },
    ],
    totalPrice: { 
        type: Number, 
        default:0,
    },
})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
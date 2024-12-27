const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Menu = require('./menu.js')
const User = require('./user.js')
const FoodTruck = require('./foodTruck.js')
const Cart = require('./cart.js')

const orderSchema=Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    foodTruck:{
        type:Schema.Types.ObjectId,
        ref:"FoodTruck",
    },
    items:[
        {
            menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
            quantity: { type: Number, required: true },
        },
    ],
    scheduleTime: { 
        type: Date,
        required: true
    },
    status: { 
        type: String,
        enum: ['Pending', 'In-Progress', 'Completed'], 
        default: 'Pending' 
    },
    paymentStatus: { // Optional field for payment tracking
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
})

const Order = mongoose.model('Order',orderSchema)
module.exports = Order
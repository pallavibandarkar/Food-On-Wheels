const FoodTruck = require("../models/foodTruck.js")
const path = require('path')
const Menu = require("../models/menu.js")
const User = require("../models/user.js")
const Cart = require("../models/cart.js")
const Order = require("../models/order.js")

const placeOrder = async(req,res)=>{
    const { cartId, scheduleTime, paymentStatus } = req.body;
    const userId = req.user._id;
    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const order = new Order({
            user: userId,
            foodTruck: cart.foodTruck,
            items:cart.items,
            scheduleTime:scheduleTime,
            paymentStatus:paymentStatus,
        });

        await order.save();

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(200).send({ message: 'Order placed successfully', data:order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

const getOrders = async(req,res)=>{
    const userId = req.user._id;
    try {
        const orders = await Order.find({ user: userId }).populate('cart').populate('foodTruck');
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getUserOrders = async(req,res)=>{
    try{
        const {id} = req.params
        const result = await Order.find({user:id})
        .populate('user')
        .populate('foodTruck')
        .populate({
            path: 'items', 
            populate: {
              path: 'menuItem'
            }
          }
        ).sort({updatedAt:-1})
        console.log("User Oders",result)
        res.status(200).send({success:true,msg:"user orders found",data:result})
    }
    catch(err){
        res.status(400).send({success:false,msg:"user orders not found",error:err})
    }
}

module.exports={
    placeOrder,
    getOrders,
    getUserOrders
}
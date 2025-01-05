const FoodTruck = require("../models/foodTruck.js")
const path = require('path')
const Menu = require("../models/menu.js")
const User = require("../models/user.js")
const Cart = require("../models/cart.js")
const Order = require("../models/order.js")
const Inventory = require("../models/inventory.js")

const placeOrder = async(req,res)=>{
    const { cartId, scheduleTime, paymentStatus } = req.body;
    const userId = req.user._id;
    try {
        const cart = await Cart.findById(cartId).populate('items.menuItem');
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
  
        const essentials = []
        const foodTruck = cart.foodTruck
        for(let item of cart.items){

            const data = await Menu.findById(item.menuItem._id)
            console.log(data)
            let quantity = item.quantity
            for(let ingredients of data.ingredients){
                const inventories = await Inventory.find({ingredient:ingredients.ingredient,foodTruck:foodTruck})
                for (let inventory of inventories) {
                    inventory.quantity -= ingredients.quantity * quantity; 
                    const result = await inventory.save(); 
                    essentials.push(result); 
                }
            }
        }


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
const FoodTruck = require("../models/foodTruck.js")
const path = require('path')
const Menu = require("../models/menu.js")
const User = require("../models/user.js")
const Cart = require("../models/cart.js")
const Order = require("../models/order.js")

const getCartItems = async(req,res)=>{
    const userId = req.user._id;
    const {id} = req.params;
    try {
        const cart = await Cart.findOne({ customer: userId, foodTruck:id }).populate('items.menuItem');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        console.log("Carts items are:",cart)
        res.status(200).send({success:true ,meassage:"cart found successfully",data: cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const addToCart = async(req,res)=>{
    const { foodTruckId, items } = req.body;
    const customer = req.user._id;
    
    try {
        const foodTruck = await FoodTruck.findById(foodTruckId);
        if (!foodTruck) {
            return res.status(404).json({ message: 'Food truck not found' });
        }

        let cart = await Cart.findOne({ customer: customer, foodTruck: foodTruckId });
        if (!cart) {
            cart = new Cart({
                customer: customer,
                foodTruck: foodTruckId,
                items: [],
            });
        }

        items.forEach(({ menuItemId, quantity }) => {
            const existingItem = cart.items.find(item => item.menuItem.toString() === menuItemId);
            if (existingItem) {
                existingItem.quantity = quantity; 
            } else {
                cart.items.push({ menuItem: menuItemId, quantity }); 
            }
        });

       
        cart.totalPrice = 0; 
        for (const item of cart.items) {
            const menuItem = await Menu.findById(item.menuItem); 
            if (menuItem) {
                cart.totalPrice += menuItem.price * item.quantity; 
            }
        }

       console.log("Cart items are :",cart)
        await cart.save();
        res.status(200).json({ message: 'Items added to cart', data: cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports={
    addToCart,
    getCartItems
}
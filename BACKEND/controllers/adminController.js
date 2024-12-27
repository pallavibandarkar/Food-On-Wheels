const FoodTruck = require("../models/foodTruck.js")
const path = require('path')
const Menu = require("../models/menu.js")
const User = require("../models/user.js")
const Cart = require("../models/cart.js")
const Order = require("../models/order.js")
const cloudinary = require('cloudinary').v2;

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ foodTruck: req.params.id })
            .populate('user')
            .populate({
                path: 'items', 
                populate: {
                  path: 'menuItem'
                }
              })
            .sort({ createdAt: -1 });
            
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
}

const updateOrder = async (req, res) => {
    const { status } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status, updatedAt: Date.now() },
            { new: true }
        );
        console.log(updatedOrder)
        res.status(200).json({ success: true, data:updatedOrder });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ success: false, message: 'Failed to update order status' });
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

const updateMenu = async(req,res)=>{
    try {
        const { id } = req.params;
        const menuItem = await Menu.findById(id);
        console.log("Requested Body",req.body.price)

        if (!menuItem) return res.status(404).send({ message: "Menu item not found" });

        if (req.file) {
            if (menuItem.image && menuItem.image.filename) {
                console.log(menuItem.image.filename)
                const file = await cloudinary.uploader.destroy(menuItem.image.filename);
            }
            menuItem.image = { url: req.file.path, filename: req.file.filename };
        }

        menuItem.name = req.body.name || menuItem.name;
        menuItem.price = req.body.price || menuItem.price;

        const result = await menuItem.save();
        console.log(result)
        res.status(200).json({ success:true,msg:"Menu Updated Successfully", data: result });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error updating menu item",error:err});
    }
}

const getMenuItem = async(req,res)=>{
    try{
        const result = await Menu.findById(req.params.id)
        res.send({success:true,msg:"Menu Found",data:result})
    }
    catch(err){
        res.send({success:false,msg:"Menu Not Found",error:err})
    }
}

const createMenu = async(req,res)=>{
    try{
        let {id}=req.params;
        console.log("id:",id)
        let {name,price} = req.body;
        let url = req.file.path;
        let filename = req.file.filename
    
        const saveMenu = new Menu({
            name:name,
            price:price,
            image:{
                url:url,
                filename:filename
            }
        })
    

        const data = await saveMenu.save()
        const addMenu = await FoodTruck.findById(id);

        if (!addMenu) {
            return res.status(404).json({ message: 'FoodTruck not found' });
        }

        addMenu.menu.push(data._id); 
        const result = await addMenu.save();
        console.log("Added Menu id",result)
        console.log("Added Menu Data",data)
        res.status(200).send({success:true,msg:"Food Truck Saved Successfully",data:data})
        
    }
    catch(err){
        console.log(err)
        res.status(400).send({success:false,msg:"Food Truck Saved Successfully",err:err.message})
    }
}

const deleteMenu = async(req,res)=>{
    try{
        const {id} = req.params
        const fid = req.headers['fid'];
        console.log(fid)
        const menu = await Menu.findById(id)
        const foodTruck = await FoodTruck.findById(fid)
        console.log(menu)
        console.log(foodTruck)
        const deleteMenuFT = await FoodTruck.findByIdAndUpdate(fid,{$pull:{menu:menu._id}})
        console.log("Menu deleted from foodTruck",deleteMenuFT)
        if(menu.image.url && menu.image.filename){
            const delFile = await cloudinary.uploader.destroy(menu.image.filename);
            console.log(delFile)
        }
        const result = await Menu.findByIdAndDelete(id)
        console.log(result)
        res.status(200).send({success:true,msg:"Deleted Successfully",data:result})
    }
    catch(err){
        console.log(err)
        console.log("Error while deleting menu",err.message)
    }
    
}

const updateFoodTruck = async(req,res)=>{
    try {
        const { id } = req.params;
        const { name, category, schedule } = req.body;
    
        const foodTruck = await FoodTruck.findById(id);
        if (!foodTruck) {
          return res.status(404).json({ success: false, message: "Food truck not found" });
        }

        if (req.file) {
          if (foodTruck.image && foodTruck.image.filename) {
            const file = await cloudinary.uploader.destroy(foodTruck.image.filename);
            console.log(file)
          }
          foodTruck.image = {
            url: req.file.path,
            filename: req.file.filename,
          };
        }
    
        foodTruck.name = name || foodTruck.name;
        foodTruck.category = category || foodTruck.category;
        foodTruck.schedule = schedule || foodTruck.schedule;
    
        const updatedFoodTruck = await foodTruck.save();
    
        res.status(200).send({
          success: true,
          message: "Food truck updated successfully",
          data: updatedFoodTruck,
        });
      } catch (error) {
        console.error("Error updating food truck:", error);
        res.status(500).json({ success: false, message: "Error updating food truck", error });
      }
}

module.exports = {
    getOrders,
    updateOrder,
    fetchFoodTruck,
    showMenu,
    updateMenu,
    getMenuItem,
    createMenu,
    deleteMenu,
    updateFoodTruck,
}
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const inventorySchema = Schema({
    foodTruck:{
        type:Schema.Types.ObjectId,
        ref:"FoodTuck"
    },
    ingredient:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    unit:{
        type: String,
        required: true,
    },
    reorderLevel:{
        type: Number,
        required: true,
    },
})

const Inventory = mongoose.model("Inventory",inventorySchema)

module.exports = Inventory

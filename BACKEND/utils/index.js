if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const mongoose = require("mongoose")
const Inventory = require("../models/inventory.js")
const initData = require("./data.js")

const dburl =process.env.ATLASDB_URL

main()
.then(()=>{
    console.log("Connected to the atlas db")
})
.catch((err)=>{
    console.log("Error occurred!!")
})

async function main() {
    await mongoose.connect(dburl)
}

const initDb = async()=>{
    try{
        const result =await Inventory.insertMany(initData.spiceRouteExpress)
       console.log(result)
       console.log("Inventory was initialized")
    }
    catch(err){
        console.log(err)
    }
}
main()
initDb();
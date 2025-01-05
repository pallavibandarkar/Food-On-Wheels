if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const router = require('./routers/foodTruckRouter.js')
const useRouter = require("./routers/userRouter.js")
const orderRouter = require("./routers/order.js")
const cartRouter = require("./routers/cart.js")
const adminOrderRouter = require("./routers/adminRouter.js")
const inventoryRouter = require("./routers/inventory.js")
const session = require('express-session')
const User = require("./models/user.js")
const passport = require('passport')
const LocalStrategy = require('passport-local')
const FoodTruck = require("./models/foodTruck.js")
const MongoStore = require('connect-mongo');


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

const sessionOptions = {
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl: process.env.ATLASDB_URL, // Replace with your MongoDB connection string
        ttl: 7 * 24 * 60 * 60, // Session lifetime in seconds (7 days)
    }),
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        SameSite:'lax'
    }
}

app.use(cors( {
        origin: true, 
        credentials: true,  
}))


app.use(session(sessionOptions));

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use("/foodTruck",router)
app.use("/profile",useRouter)
app.use("/cart",cartRouter)
app.use("/order",orderRouter)
app.use("/admin",adminOrderRouter)
app.use("/inventory",inventoryRouter)

app.get("/profile/status", (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ loggedIn: true, user: req.user });
    } else {
        res.status(200).json({ loggedIn: false });
    }
});


app.get("/test", (req, res) => {
    console.log("Request User",req.user)
    res.status(200).send({ success:true,msg:"User Found Successfully",data: req.user });
});
app.get('/session', (req, res) => {
    console.log("Session Data:", req.session);
    res.send({ session: req.session });
});
app.get("/home",(req,res)=>{
    res.send("Sending request to the home page!")
})

// app.get("/testa", (req, res) => {
//     console.log("Session:", req.session);
//     console.log("Is Authenticated:", req.isAuthenticated());
//     console.log("User:", req.user);

//     if (req.isAuthenticated()) {
//         console.log(req)
//         res.send({ data: req.user});
//     } else {
//         res.status(401).json({ error: "User not authenticated" });
//     }
// });

// app.get('/updateData',async(req,res)=>{
//     try{
//         const userId = "675b2b0706c1bfb2cecd123a"
//         const updateUser = await User.findByIdAndUpdate(userId,{role:'admin'},{new:true})
//         console.log("UpdatedUser",updateUser)
    
//         const ftId = "67584ce8751d0e285806a554"
//         const foodTruck = await FoodTruck.findByIdAndUpdate(ftId,{admin:updateUser._id},{new:true})
//         res.send(foodTruck)
//     }
//     catch(err){
//         res.send(err.message)
//     }
    
// })

// app.get("/updateData",async(req,res)=>{
//     const userId = "675b2b0706c1bfb2cecd123a"
//     const updatedUser = await User.findByIdAndUpdate(userId,{foodTruck:"67584ce8751d0e285806a554"},{new:true})
//     console.log(updatedUser)
//     res.send(updatedUser)
// })
// app.get("/ses",(req,res)=>{
//     if(!req.session.count){
//         req.session.count++
//     }else{
//         req.session.count++
//     }
//     res.send(`U sen request ${req.session.count}`)
// })

app.listen(8080,()=>{
    console.log("Listening on port 8080")
})
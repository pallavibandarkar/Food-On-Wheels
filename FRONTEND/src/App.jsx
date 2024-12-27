import React from "react";
import {Routes,Route} from "react-router-dom"
import { useState } from "react"
import Navbar from "./Navbar/Navbar.jsx";
import Home from "./pages/Home.jsx";
import FoodTruckMenu from "./pages/FoodTruckMenu/FootTruckMenu.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/signup/signup.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import MenuMgnt from "./components/AdminDashBoard/MenuMgnt/MenuMgnt.jsx";
import PlaceOrder from "./components/placeOrder/placeOrder.jsx";
import MyOrders from "./components/UserOrders/Order.jsx";
import OrderManagement from "./components/AdminDashBoard/OrderMgnt/OrderMgnt.jsx";
import EditMenuItem from "./components/AdminDashBoard/EditMenu/EditMenu.jsx";
import FoodTrcukMgnt from "./components/AdminDashBoard/FoodTruckMgnt/FoodTruckMgnt.jsx";


export default function App(){
  const [login,setLogin] = useState(false)
  return(
    <div>
      <Navbar login={login} setLogin={setLogin}></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/foodTruck/:id" element={<FoodTruckMenu/>}/>
        <Route path="/signup" element={<Signup login={login} setLogin={setLogin}/>} />
        <Route path="/login" element={<Login login={login} setLogin={setLogin}/>} />
        
        <Route path="/:id/menu/admin" element={<MenuMgnt/>}></Route>
        <Route path="/place-order/:id" element={<PlaceOrder/>}></Route>
        <Route path="/Myorders/:id" element={<MyOrders/>}></Route>
        <Route path="/:id/admin/orders" element={<OrderManagement/>}/>
        <Route path="/admin/:id" element={<Admin/>}></Route>
        <Route path="/admin/updateMenu/:id" element={<EditMenuItem/>}/>
        <Route path="/admin/foodTruckMgnt/:id" element={<FoodTrcukMgnt/>}/>
      </Routes>
    </div>
  )
}
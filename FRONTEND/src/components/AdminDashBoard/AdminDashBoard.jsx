import React, { useEffect, useState } from "react";
import "./AdminDashBoard.css"
import axios from 'axios'
import { assets } from "../../assets/assets";
import { useParams,useNavigate } from "react-router-dom";

export default function AdminDashBoard({ foodTruckId }){
    const navigate = useNavigate();
    const {id} = useParams()
    const [foodTruck,setFoodTruck] = useState({
        name:"",
        location:"",
        schedule:"",
        category:"",
        image:{
            url:"",
            filename:""
        }
    })
    const fecthData = async()=>{
        try{
            const result = await axios.get(`http://localhost:8080/admin/fetchData/${foodTruckId}`,{
                withCredentials: true,  
            })
            console.log(result.data.data)
            const foodTruck = result.data.data
            setFoodTruck(foodTruck)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fecthData()
    },[])
    return(
        <div className="adminDashBoard">
            <div className="foodTrcuk">
                <img src={foodTruck.image.url}/>
                <div className="foodTruckDetails">
                    <h2>{foodTruck.name}</h2>
                    <p>{foodTruck.schedule}</p>
                    <p>{foodTruck.location}</p>
                    <p>{foodTruck.category}</p>
                </div>
            </div>
            <div className="adminFunctionalities">
            {console.log(`/admin/${foodTruckId}/menu`)}
                <div className="fuction" onClick={()=>navigate(`/${foodTruckId}/menu/admin`)}>
                
                    <img src={assets.banner}/>
                    <h3>Menu Mangement</h3>
                </div>
                <div className="fuction" onClick={()=>navigate(`/${foodTruckId}/admin/orders`)}>
                    <img src={assets.banner}/>
                    <h3>Order Mangement</h3>
                </div>
                <div className="fuction" onClick={()=>navigate(`/admin/foodTruckMgnt/${foodTruckId}`)}>
                    <img src={assets.banner}/>
                    <h3>Food Trcuk <br/> Mangement</h3>
                </div>
                <div className="fuction">
                    <img src={assets.banner}/>
                    <h3>Inventory Mangement</h3>
                </div>
                <div className="fuction">
                    <img src={assets.banner}/>
                    <h3>Menu Mangement</h3>
                </div>
            </div>
        </div>
    )
}
import React, { useEffect, useState } from "react"
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import FoodT from "../FoodT/FoodT";
import "./ExploreFoodTruck.css"; 

export default function ExploreFoodTucks(){
    const [foodTruck,setFoodTruck] = useState([])
    const navigate = useNavigate();

    const fecthData = async ()=>{
        try{
            const result = await axios.get("http://localhost:8080/foodTruck/show",{
                withCredentials: true,  
            })
            
            console.log('Fetched posts:', result);  
            console.log('Fetched posts data:', result.data);  
            setFoodTruck(result.data.data);  
        }
        catch(err){
            console.error("food truck not found", err);
        }
    }

    useEffect(() => {
        fecthData();
    }, []); 
     
    return(
        <div className="foodtrucks">
        {foodTruck.length===0?(
            <p>No Food Truck Available</p>
        ):(
            foodTruck.map((foodT)=>(
                <div key={foodT._id}>
                    <FoodT name={foodT.name}
                        _id = {foodT._id} 
                        schedule={foodT.schedule} 
                        location={foodT.location}
                        category={foodT.category}
                        url={foodT.image.url}
                    />
                </div>
            ))
        )}
        </div>
    )
}
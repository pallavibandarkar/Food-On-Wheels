import React, { useEffect, useState } from "react"
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Show.css"
import { useNavigate } from "react-router-dom";

export default function Show(){
    const [foodTruck,setFoodTruck] = useState([])
    const navigate = useNavigate();

    const fecthData = async ()=>{
        try{
            const result = await axios.get("http://localhost:8080/foodTruck/show")
            
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
        <div>
        {foodTruck.length===0?(
            <p>No Food Truck Available</p>
        ):(
            foodTruck.map((foodT)=>(
                <div key={foodT._id} className="foodtruck">
                    <h3>{foodT.name}</h3>
                    <p>{foodT.location}</p>
                    <p>{foodT.schedule}</p>
                    <img
                        src={foodT.image.url} 
                        alt={foodT.name}
                        width="200"
                        height="100"
                    />

                <button onClick={()=>navigate(`/addMenu/${foodT._id}`)}>ADD MENU ITEM</button>
                </div>
            ))
        )}
        </div>
    )
}
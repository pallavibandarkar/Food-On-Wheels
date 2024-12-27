import React from "react";
import "./FoodT.css";
import { useNavigate } from "react-router-dom";

export default function FoodT({_id,name,schedule,location,category,url}){
    const navigate = useNavigate();

    return(
        <div className="foodT">
            <img src={url} width="300px" height="300px"/>
            <div className="foodTdetails">
                <h4>{name}</h4>
                <p>{category}</p>
                <p>{location}</p>
                <p>{schedule}</p>
            </div>
            <button onClick={()=> navigate(`/foodTruck/${_id}`)}>View Menu</button>
        </div>
    )
}
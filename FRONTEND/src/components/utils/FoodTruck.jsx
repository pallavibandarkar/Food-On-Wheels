import React, { useEffect, useState } from "react"
import "./FoodTruck.css"
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function FoodTruck (){
    const [foodTruck,setFoodTruck] = useState({
        name:"",
        image:"",
        schedule:"",
        location:"",
        category:"",
    })

    const onChaneHandler = (e)=>{
        setFoodTruck((prevData)=>({
            ...prevData,
            [e.target.name]:e.target.value
        }))
    }

    const handelImageChange=(e)=>{
        setFoodTruck((prevData)=>({
            ...prevData,
            image:e.target.files[0]
        }));
    }


    const onSubmitHandler =async(e)=>{
        e.preventDefault()

        const formData = new FormData();
        formData.append("name",foodTruck.name)
        formData.append("image",foodTruck.image)
        formData.append("schedule",foodTruck.schedule)
        formData.append("location",foodTruck.location)
        formData.append("category",foodTruck.category)

        try{
        const response = await axios.post("http://localhost:8080/foodTruck/add",formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
            console.log('Food Truck Added successfully:', response.data);
            toast.success("Post created successfully!", {
            position: "top-right",
            autoClose: 5000,
            });

            setFoodTruck({
                name:"",
                image:"",
                schedule:"",
                location:"",
                category:""
            })

        }
        catch(err){
            console.log('Food Truck not added successfully:',err);
            toast.error("Failed to add food Truck!", {
                position: "top-right",
                autoClose: 5000,
            });
        }
    }

    useEffect(()=>{
        console.log(foodTruck)
    },[foodTruck])

    return(
    <div className="FoodTruck" onSubmit={onSubmitHandler}>
        <h1>Food Truck Form</h1>
        <form className="FoodTruckForm">
             <label htmlFor="food-truck">Food Name:</label>
            <input type="text" placeholder="food truck name" name="name" value={foodTruck.name} onChange={onChaneHandler} required/>
            <br/>
            <label htmlFor="food-truck">Food Truck Image:</label>
            <input type="file" required name="image" id="food-truck" onChange={handelImageChange}/>
            <br/>
            <label htmlFor="food-truck">Schedule:</label>
            <input type="text" placeholder="eg: Daily(9am - 10pm)" value={foodTruck.schedule} name="schedule" onChange={onChaneHandler} required/>
            <br/>
            <label htmlFor="food-truck">Location:</label>
            <input type="text" placeholder="eg: Marine Drive, Mumbai" name="location" value={foodTruck.location} onChange={onChaneHandler} required/>
            <br/>
            <label htmlFor="category">Category:</label>
            <input type="text" placeholder="eg: Indian, Jain, Veg" name="category" value={foodTruck.category} onChange={onChaneHandler} required/>
            <br/>
            <button>Submit</button>
        </form>
        <ToastContainer position="top-right" autoClose={5000} />
    </div>
    )
}
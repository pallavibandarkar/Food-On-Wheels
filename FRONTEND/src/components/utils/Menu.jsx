import React, { useEffect, useState ,useRef } from "react"
import "./Menu.css"
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

export default function FoodTruck (){
    const { id } = useParams();
    const fileInputRef = useRef(null);
    const [menu,setMenu] = useState({
        name:"",
        image:"",
        price:"",
    })

    const onChaneHandler = (e)=>{
        setMenu((prevData)=>({
            ...prevData,
            [e.target.name]:e.target.value
        }))
    }

    const handelImageChange=(e)=>{
        setMenu((prevData)=>({
            ...prevData,
            image:e.target.files[0]
        }));
    }


    const onSubmitHandler =async(e)=>{
        e.preventDefault()

        const formData = new FormData();
        formData.append("name",menu.name)
        formData.append("image",menu.image)
        formData.append("price",menu.price)

        try{
        const response = await axios.post(`http://localhost:8080/foodTruck/addMenu/${id}`,formData,
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

            setMenu({
                name:"",
                image:"",
                price:"",
            })
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        }
        catch(err){
            console.log('Food Truck not added successfully:',err);
            toast.error("Failed to add food Truck!", {
                autoClose: 5000,
            });
        }
    }

    useEffect(()=>{
        console.log(menu)
    },[menu])

    return(
    <div className="FoodTruck" onSubmit={onSubmitHandler}>
        <h1>Food Truck Form</h1>
        <form className="FoodTruckForm">
             <label htmlFor="food-truck">Food Name:</label>
            <input type="text" placeholder="food truck name" name="name" value={menu.name} onChange={onChaneHandler} required/>
            <br/>
            <label htmlFor="food-truck">Food Truck Image:</label>
            <input type="file" required name="image" accept="image/*" ref={fileInputRef}  id="food-truck" onChange={handelImageChange}/>
            <br/>
            <label htmlFor="price">Price:</label>
            <input type="text" placeholder="50,30" value={menu.price} name="price" onChange={onChaneHandler} required/>
            <br/>
            <button>Submit</button>
        </form>
        <ToastContainer position="top-right" autoClose={5000} />
    </div>
    )
}
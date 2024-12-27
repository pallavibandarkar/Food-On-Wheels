import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { use } from "react";

export default function Login({login,setLogin}){
    const navigate = useNavigate();
    
    
    const [user,setUser] = useState({
        username:"",
        password:"",
    })

    const onChangeHandler = (e)=>{
        const name=e.target.name
        const value=e.target.value
        setUser((prevUser)=>({...prevUser,[name]:value}))
    }

    const onSubmitHandler=async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("username",user.username)
        formData.append("email",user.email)
        formData.append("password",user.password)

        try{
            const result = await axios.post("http://localhost:8080/profile/login",user,{
                withCredentials: true,  
            })
            console.log("Response of User logged in:",result)
            console.log("User logged in data:",result.data.data)
            const userData = result.data.data
            console.log("UserData",userData)
            toast.success("User Logged In successfully!", {
                position: "top-right",
                autoClose: 3000,         
            });
            setLogin(true)
            setTimeout(() => {
                if(userData.foodTruck && userData.role == "admin"){
                    navigate(`/admin/${userData.foodTruck}`)
                }else{
                    navigate("/")
                }
            }, 4000);
           
            
            setUser({
                username:"",
                password:"",
            })
        }
        catch(error){
            if (error.response && error.response.status === 401) {
                toast.error("Please Log In. Please try again.", { position: "top-right" });
                navigate("/login");  
            } else {
                console.error(error);
                toast.error("Failed to Log In. Please try again.", { position: "top-right" });
            }
            console.log(err.message)
            
        }
    }

    const checkUser = async()=>{
        const result = await axios.get("http://localhost:8080/testa")
        setUserData(result.data.data)
    }

    useEffect(()=>{
        console.log("User:",user)
    },[user])

    

    return(
        <div className="Login">
            <h2>Log In</h2>
            <form className="LoginForm" onSubmit={onSubmitHandler}>
                <label htmlFor="username">Username:</label>
                <input 
                  type="text" 
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={onChangeHandler}
                  value={user.username} required/>

                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  name="password"
                  id="password"
                  value={user.password}
                  onChange={onChangeHandler}
                  required/>
                
                <button>Log In</button>
                  
            </form>
            <ToastContainer />
        </div>
    )
}
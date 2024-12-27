import React, { useEffect, useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup({login,setLogin}){
    const navigate = useNavigate();
    const [user,setUser] = useState({
        username:"",
        email:"",
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
            const result = await axios.post("http://localhost:8080/profile/signup",user,{
                withCredentials: true,  
            })
            console.log(result.data.data)
            setLogin(true)
            toast.success("User signed up successfully!", {
                position: "top-right",
                autoClose: 3000,         
            });
            setTimeout(() => {
                navigate("/");
            }, 4000);
            setUser({
                username:"",
                email:"",
                password:"",
            })
        }
        catch(err){
            console.log(err.message)
            toast.error("Failed to sign up. Please try again.", { position: "top-right" });
        }
    }

    useEffect(()=>{
        console.log("User:",user)
    },[user])

    return(
        <div className="signup">
            <h2>Sign Up</h2>
            <form className="signupForm" onSubmit={onSubmitHandler}>
                <label htmlFor="username">Username:</label>
                <input 
                  type="text" 
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={onChangeHandler}
                  value={user.username} required/>
                
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={user.email} 
                  onChange={onChangeHandler} required/>

                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  name="password"
                  id="password"
                  value={user.password}
                  onChange={onChangeHandler}
                  required/>
                
                <button>Sign Up</button>
                  
            </form>
            <ToastContainer />
        </div>
    )
}
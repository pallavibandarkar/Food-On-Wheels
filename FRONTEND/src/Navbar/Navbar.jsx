import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { useState,useEffect,useRef } from "react";
import "./Navbar.css"
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar({login,setLogin}){
    const navigate = useNavigate();
    const[userData,setUserData]= useState({})
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);  

    const checkLoginStatus = async () => {
        try {
            const result = await axios.get("http://localhost:8080/profile/status", {
                withCredentials: true, 
            });
            if (result.data.loggedIn) {
                setLogin(true);
                setUserData(result.data.user); 
            } else {
                setLogin(false); 
            }
        } catch (err) {
            console.error("Error checking login status:", err.message);
            setLogin(false);
        } finally {
            setIsLoading(false); 
        }
    };

    const handleUserOrders = async(req,res)=>{
        const result = await axios.get(`http://localhost:8080/order/${userData._id}`)
        console.log(result.data.data)
    }

    useEffect(() => {
        checkLoginStatus(); 
        
    }, []);
    console.log("User Data is : ",userData)
    const handleLogout = async () => {
        try {
            const result = await axios.get("http://localhost:8080/profile/logout",{
                withCredentials: true,  
            });
            setLogin(false)
            console.log(result)
            // toast.success("User Log Out!", {
            //             position: "top-right",
            //             autoClose: 3000,         
            // });
            navigate("/")
        } catch (err) {
            console.error("Logout failed:", err.message);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); 
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return(
        <div className="Navbar">
            <div className="NavLogo">
                <img src={assets.banner} onClick={()=>navigate("/")}/>
                <h4 onClick={()=>navigate("/")}>FlavorRoute</h4>
                
            </div>
            <div className="Navsearch">
                <input type="text" placeholder="serch food truck"/>
            </div>
            <div className='menuBar'>
                <FontAwesomeIcon
                    icon={faBars}
                    onClick={toggleMenu} 
                />
            </div>
            
            <div className={`Navprofilebtn ${menuOpen ? "open" : ""}`}>
               <FontAwesomeIcon className="xMark" onClick={toggleMenu} icon={faXmark} />
                {login && (
                <>
                  <button onClick={handleLogout}>LogOut</button>
                  <button onClick={()=>navigate(`/Myorders/${userData._id}`)}>My Orders</button>
                </>
                )}
                {!login && (
                <>
                  <button onClick={() => navigate("/login")}>Login</button>
                  <button onClick={() => navigate("/signup")}>Sign Up</button>
                </>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}
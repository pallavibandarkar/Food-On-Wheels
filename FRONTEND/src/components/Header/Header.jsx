import React from "react";
import "./Header.css"

export default function Header(){
    return(
        <div className="Header">
            <div className="header-component">
                <h2>Order Your favourite food here</h2>
                <p>Choose from diverse menu featuring a delectable feature of array of dishes
                    craffed with finest ingridients. Our mission is to statisfy your cravings and
                    elevate your experience,one delicious food at a time
                </p>
                <button>View More</button>
            </div>
        </div>
    )
}
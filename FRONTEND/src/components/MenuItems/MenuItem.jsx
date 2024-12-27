import React from "react";
import "./MenuItem.css"
import { assets } from "../../assets/assets";

export default function MenuItem({_id,url,name,price,count,setCounts}){
    return(
        <div className="menuItem">
            <img src={url} width="200" height="200"/>
            <div>
                <h3>{name}</h3>
                <p>{price}</p>
            </div>
        {count === 0 ? (
        <img className="add-black"
          onClick={() => setCounts(1)} // Increment count by 1
          src={assets.add_icon_white}
          alt="Add"
        />
        ) : (
        <div className="quantity-controls">
          <img className="add-green"
            onClick={() => setCounts(1)} 
            src={assets.add_icon_green}
            alt="Increase"
          />
          <p>{count}</p>
          <img className="removeRed"
            onClick={() => setCounts(-1)} 
            src={assets.remove_icon_red}
            alt="Decrease"
          />
        </div>
      )}
        </div>
    )
}
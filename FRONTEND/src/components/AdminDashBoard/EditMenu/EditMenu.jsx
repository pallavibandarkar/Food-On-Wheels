import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditMenu.css"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditMenuItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [menuItem, setMenuItem] = useState({
    name: "",
    price: "",
    image: { url: "", filename: "" },
  });

  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    price: "",
    image: null,
  });

  const fetchData = async () => {
    console.log(id)
    try {
       console.log("Calling GetMenuItem Fuction")
       const result = await axios.get(`http://localhost:8080/admin/getMenuItem/${id}`,{withCredentials:true});
       setMenuItem(result.data.data);
       setNewMenuItem({
          name: result.data.data.name,
          price: result.data.data.price,
          image: null,
        });
    } catch (err) {
       console.error("Error fetching menu item data:", err);
    }
  };


  useEffect(() => {
    fetchData();
  }, [id]);


  const handleEdit = async () => {
    const formData = new FormData();
    formData.append("name", newMenuItem.name);
    formData.append("price", newMenuItem.price);
    
    if (newMenuItem.image) {
      formData.append("image", newMenuItem.image);
    }

    try {
        console.log("Calling Edit")
        console.log(newMenuItem)
        const result = await axios.post(`http://localhost:8080/admin/updateMenu/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },withCredentials:true,
      });
      console.log(result.data.data)
      setNewMenuItem({
        name:"",
        price:"",
        image:null
      })
      toast.success("Menu Edited Successfully",{
        autoClose:2000
      })
      setTimeout(()=>{
        navigate(-1)
      },3000)
    } catch (err) {
      console.error("Error updating menu item:", err);
    }
  };


  if (!menuItem || !menuItem.name) {
    return <div className="loading">Loading...</div>; 
  }

  return (
    <div className="edit-menu-item-container">
    <h2 className="edit-title">Edit Menu Item</h2>
    <form className="edit-form">
      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          type="text"
          placeholder="Name"
          value={newMenuItem.name}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Price</label>
        <input
          type="number"
          placeholder="Price"
          value={newMenuItem.price}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
          className="form-input"
        />
      </div>

      <div className="form-group">
        {menuItem.image.url && (
          <>
          <p>Preview Image:</p>
          <img
            src={menuItem.image.url}
            alt={menuItem.name}
            className="menu-item-image"
          />
          </>
        )}
        <input
          type="file"
          onChange={(e) => setNewMenuItem({ ...newMenuItem, image: e.target.files[0] })}
          className="image-input"
        />
      </div>

      <button type="button" onClick={handleEdit} className="submit-btn">
        Save Changes
      </button>
    </form>
    <ToastContainer/>
  </div>
  );
}

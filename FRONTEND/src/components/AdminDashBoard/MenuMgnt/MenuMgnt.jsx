import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import "./MenuMgnt.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MenuMgnt() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [fid,setFid] = useState("")

    const [foodMenu, setFoodMenu] = useState({
        menu: [],
    });

    const [newMenuItem, setNewMenuItem] = useState({
        name: "",
        price: "",
        image: null,
    });

    const fetchData = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/admin/${id}`, {
                withCredentials: true,
            });
            setFoodMenu(result.data.data);
        } catch (err) {
            console.error("Error fetching food truck data:", err);
        }
    };

    const handleDelete = async (menuId) => {
        try {
            console.log("Menu id",menuId)
            const result = await axios.delete(`http://localhost:8080/admin/deleteItem/${menuId}`,{
                headers: {
                    'fid': fid, // Add fid to headers
                },
                withCredentials: true,
            });
            toast.success("Menu Item Deleted Successfully",{
                    autoClose:2000
                })
            setFoodMenu((prev) => ({
                ...prev,
                menu: prev.menu.filter((m) => m._id !== menuId),
            }));
            
        } catch (err) {
            console.error("Error deleting menu item:", err);
        }
    };

    const handleAdd = async () => {
        const formData = new FormData();
        formData.append("name", newMenuItem.name);
        formData.append("price", newMenuItem.price);
        if (newMenuItem.image) formData.append("image", newMenuItem.image);
        formData.append("foodtruck", id);

        try {
            const response = await axios.post(`http://localhost:8080/admin/addMenu/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            toast.success("Menu Item Added Successfully",{
                autoClose:2000
            })
            setFoodMenu((prev) => ({
                ...prev,
                menu: [...prev.menu, response.data.data],
            }));
            setNewMenuItem({ name: "", price: "", image: null });
        } catch (err) {
            console.error("Error adding menu item:", err);
        }
    };



    useEffect(() => {
        setFid(id)
        fetchData();
    }, []);

    return (
        <div className="Menus">
            <h2>Menu Management</h2>
            
            <div className="MenuItems">
                
                {foodMenu.menu.length === 0 ? (
                    <p>No menu items available</p>
                ) : (
                    foodMenu.menu.map((m) => (
                        <div key={m._id} className="menu">
                            <img src={m.image.url} width="210" height="210" alt={m.name} />
                            <p>{m.name}</p>
                            <p>{m.price}</p>
                            <button
                                onClick={() =>
                                   navigate(`/admin/updateMenu/${m._id}`)
                                }
                            >
                                Edit
                            </button>
                            <button onClick={() => handleDelete(m._id)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
            
            <div className="AddMenu">
                <h3>Add New Menu Item</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={newMenuItem.name}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newMenuItem.price}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                />
                <input
                    type="file"
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, image: e.target.files[0] })}
                />
                <button onClick={handleAdd}>Add Menu Item</button>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FoodTruckMgnt.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FoodTruckMgnt() {
  const [foodTruck, setFoodTruck] = useState({
    name: "",
    category: "",
    schedule: "",
    image: { url: "", filename: "" },
  });
  const [newFoodTruck, setNewFoodTruck] = useState({
    name: "",
    category: "",
    schedule: "",
    image: null,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/admin/fetchData/${id}`, {
        withCredentials: true,
      });
      setFoodTruck(result.data.data);
      setNewFoodTruck({
        name: result.data.data.name,
        category: result.data.data.category,
        schedule: result.data.data.schedule,
        image: null,
      });
    } catch (err) {
      console.error("Error fetching food truck data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append("name", newFoodTruck.name);
    formData.append("category", newFoodTruck.category);
    formData.append("schedule", newFoodTruck.schedule);
    if (newFoodTruck.image) {
      formData.append("image", newFoodTruck.image);
    }

    try {
      const result = await axios.post(
        `http://localhost:8080/admin/updateFoodTruck/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log(result.data.data);
      toast.success("Food Truck Data Updated Successfully",{
        autoClose:2000,
      })
      navigate(-1); 
    } catch (err) {
      console.error("Error updating food truck:", err);
    }
  };

  return (
    <div className="foodTruck">
      <h1 className="form-title">Edit Food Truck</h1>
      <form className="foodTruck-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={newFoodTruck.name}
            onChange={(e) => setNewFoodTruck({ ...newFoodTruck, name: e.target.value })}
            placeholder="Enter food truck name"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={newFoodTruck.category}
            onChange={(e) => setNewFoodTruck({ ...newFoodTruck, category: e.target.value })}
            placeholder="Enter food truck category"
          />
        </div>

        <div className="form-group">
          <label>Schedule</label>
          <input
            type="text"
            value={newFoodTruck.schedule}
            onChange={(e) => setNewFoodTruck({ ...newFoodTruck, schedule: e.target.value })}
            placeholder="Enter schedule (e.g., Sat-Sun 1 PM - 10 PM)"
          />
        </div>

        <div className="form-group">
          <label>Image</label>
          {foodTruck.image.url && (
            <>
              <p>Current Image:</p>
              <img src={foodTruck.image.url} alt={foodTruck.name} className="foodTruck-image" />
            </>
          )}
          <input
            type="file"
            onChange={(e) => setNewFoodTruck({ ...newFoodTruck, image: e.target.files[0] })}
          />
        </div>

        <button type="button" onClick={handleEdit} className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./placeOrder.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PlaceOrder() {
  const { id } = useParams(); 
  console.log("Food Tuck Id:",id)
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [custcartId,setCustcartId] = useState("")
  const [scheduleTime, setScheduleTime] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Pending");  // Default payment status

  // Fetch cart items for the user
  const fetchCart = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/cart/getCart/${id}`,{
        withCredentials: true,  
    });  
      setCart(result.data.data); 
    } catch (err) {
      console.error("Error fetching cart:", err);
      if (err.response && err.response.status === 401) {
        toast.error("Please log in to access this page.");
        navigate("/login");
      } else {
        toast.error("Failed to fetch cart items.");
      }
      
    }
  };

  // Handle order placement
  const placeOrder = async () => {
    if (!scheduleTime) {
      toast.error("Please enter a scheduled time.");
      return;
    }

    try {
      const cartId = custcartId;  // Fetch or store this cartId somewhere in the state (from cart fetch)
      await axios.post("http://localhost:8080/order/placeOrder", {
        cartId,            // Cart ID to associate the order with the user's cart
        scheduleTime,     // Scheduled time for the order
        paymentStatus      // Payment status, can be 'Pending', 'Paid', 'Failed'
      },{
        withCredentials: true,  
    });
      toast.success("Order placed successfully!",{
        position: "top-right",
        autoClose: 1000,         
      });
      setTimeout(() => {
        navigate(`/foodTruck/${id}`);
      }, 2000);
      // Redirect to order confirmation page
    } catch (err) {
      console.error("Error placing order:", err);
      if (err.response && err.response.status === 401) {
        toast.error("Please log in to access this page.");
        navigate("/login");
      } else {
        toast.error("Failed to place order.");;
      }
      
    }
  };


  useEffect(() => {
    if (cart._id) {
      setCustcartId(cart._id);
    }
  }, [cart]); 

  useEffect(() => {
    fetchCart(); // Fetch cart on load
    
  }, []);
  console.log(cart)
  console.log("Customer cart id is",custcartId)
  if (!cart.items) {
    return <div>Loading cart...</div>;  // Show loading state while fetching cart data
  }
  return (
    <div className="PlaceOrder">
      <h3>Place Your Order</h3>
      <div className="cart-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map((item) => (
              <tr key={item.menuItem._id}>
                <td>
                  <img src={item.menuItem.image.url} alt={item.menuItem.name} width="50" height="50" />
                </td>
                <td>{item.menuItem.name}</td>
                <td>&#8377;{item.menuItem.price}</td>
                <td>{item.quantity}</td>
                <td>&#8377;{item.menuItem.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Total Price: &#8377;{cart.totalPrice}</h2>
      <input
        type="datetime-local"
        value={scheduleTime}
        onChange={(e) => setScheduleTime(e.target.value)}
      />
      <button onClick={placeOrder}>Place Order</button>
      <ToastContainer />
    </div>
  );
}

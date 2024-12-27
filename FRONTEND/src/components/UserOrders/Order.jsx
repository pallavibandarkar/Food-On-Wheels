import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css';


export default function MyOrders() {
  const [userId,setUserId] = useState("")
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user,setUser] = useState({})

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/order/${userId}`, { withCredentials: true });
      setOrders(response.data.data);
      console.log("Users Order Data :",response.data.data)
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async()=>{
    try{
      const response = await axios.get("http://localhost:8080/test",{
        withCredentials: true,  
    })
      console.log("Order Place User Found",response)
      setUser(response.data.data)
      setUserId(response.data.data._id)
    }
    catch(err){
      console.log("Error Occured")
      console.log(err)
    }
  }


  useEffect(()=>{
    fetchUser()
  },[])

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);
  
  return (
    <div className="my-orders">
      <h3>My Orders</h3>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Food Truck</th>
              <th>Items</th>
              <th>Schedule Time</th>
              <th>Status</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.foodTruck.name}</td>
                <td>
                  {order.items.map((item, index) => (
                    <p key={index}>
                      {item.menuItem.name} (x{item.quantity})
                    </p>
                  ))}
                </td>
                <td>{new Date(order.scheduleTime).toLocaleString()}</td>
                <td>{order.status}</td>
                <td>{order.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

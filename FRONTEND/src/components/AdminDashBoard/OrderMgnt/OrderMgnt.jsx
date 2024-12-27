import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderMgnt.css';
import { useParams } from 'react-router-dom';

export default function OrderManagement() {
    const {id} = useParams()
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/admin/orders/${id}`, {
                withCredentials: true,
            });
            setOrders(response.data.orders);
            console.log(response.data.orders)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/admin/updateOrders/${orderId}`,
                { status: newStatus },
                { withCredentials: true }
            );
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: response.data.data.status } : order
                )
            );
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    if (loading) return <p>Loading orders...</p>;

    return (
        <div className="order-management">
            <h2>Order Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Scheduled Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.user.username}</td>
                            <td>
                                {order.items.map((item) => (
                                    <div key={item.menuItem._id}>
                                        {item.menuItem.name} x {item.quantity}
                                    </div>
                                ))}
                            </td>
                            <td>{new Date(order.scheduleTime).toLocaleString()}</td>
                            <td>{order.status}</td>
                            <td>
                               {["Canceled", "Completed"].includes(order.status) ? (
                                  <span>Finalized</span>
                                ) : (
                                    <>
                                    <button onClick={() => updateOrderStatus(order._id, 'In-Progress')}>
                                       In-Progress
                                    </button>
                                    <button onClick={() => updateOrderStatus(order._id, 'Completed')}>
                                       Completed
                                    </button>
                                    <button onClick={() => updateOrderStatus(order._id, 'Canceled')}>
                                       Canceled
                                    </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

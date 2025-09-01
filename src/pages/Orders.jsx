// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import API from "../api.js";

const statusSteps = ["Placed", "Preparing", "Out for Delivery", "Delivered"];

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.token) return;

      try {
        const res = await API.get("/orders", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;
  if (orders.length === 0) return <p>You have no orders yet.</p>;

  return (
    <div className="container mt-4">
      <h2>Your Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="card mb-4">
          <div className="card-header">Order ID: {order._id}</div>
          <div className="card-body">
            <ul>
              {order.items.map(item => (
                <li key={item._id || item.name}>
                  {item.name} x {item.qty} - ₹{item.price * item.qty}
                </li>
              ))}
            </ul>
            <p>Total: ₹{order.totalPrice}</p>

            {/* Status Tracker */}
            <div className="mt-3">
              {statusSteps.map((step, index) => (
                <span
                  key={step}
                  style={{
                    display: "inline-block",
                    marginRight: "10px",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    backgroundColor: statusSteps.indexOf(order.status) >= index ? "#4caf50" : "#ccc",
                    color: "#fff"
                  }}
                >
                  {step}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;

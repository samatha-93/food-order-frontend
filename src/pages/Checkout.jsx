import React, { useState } from "react";
import { useCart } from "../contexts/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import API from "../api.js";
import { useAuth } from "../contexts/AuthContext.jsx";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth(); // ✅ use AuthContext
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [coupon, setCoupon] = useState("");

  const handlePlaceOrder = async () => {
    if (!user) {  // ✅ check user from context
      alert("You must login to place order");
      navigate("/login");
      return;
    }

    if (!address) return alert("Enter delivery address");
    if (cart.length === 0) return alert("Cart is empty");

    try {
      let totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
      if (coupon === "DISCOUNT50") totalPrice -= 50;

      const orderData = { items: cart, totalPrice, address, paymentMethod, coupon };

      await API.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${user.token}` } // ✅ send token
      });

      alert("Order placed successfully!");
      clearCart();
      navigate("/orders");
    } catch (err) {
      const status = err.response?.status;
      if (status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert(err.response?.data?.message || err.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map(item => (
              <li key={item._id || item.name} className="list-group-item d-flex justify-content-between">
                {item.name} x {item.qty} <span>₹{item.price * item.qty}</span>
              </li>
            ))}
          </ul>

          <h4>Total: ₹{cart.reduce((acc, item) => acc + item.price * item.qty, 0)}</h4>

          <textarea
            className="form-control mb-3"
            placeholder="Delivery Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />

          <select
            className="form-select mb-3"
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Card">Credit/Debit Card</option>
            <option value="UPI">UPI</option>
          </select>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Coupon code"
            value={coupon}
            onChange={e => setCoupon(e.target.value)}
          />
          {coupon === "DISCOUNT50" && <small className="text-success">₹50 discount applied!</small>}

          <button className="btn btn-success" onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default Checkout;

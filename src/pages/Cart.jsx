import React from "react";
import { useCart } from "../contexts/CartContext.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id || item.name}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <button className="btn btn-sm btn-secondary me-1" onClick={() => decreaseQty(item.name)}>-</button>
                    {item.qty}
                    <button className="btn btn-sm btn-secondary ms-1" onClick={() => increaseQty(item.name)}>+</button>
                  </td>
                  <td>₹{item.price * item.qty}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.name)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Total: ₹{total}</h4>
          <button className="btn btn-warning me-2" onClick={clearCart}>Clear Cart</button>
          <button className="btn btn-primary" onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;

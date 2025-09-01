import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>₹{item.price} × {item.qty}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Total: ₹{total}</h2>
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

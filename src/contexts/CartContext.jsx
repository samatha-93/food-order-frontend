import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item or increase quantity
  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.name === item.name);
      if (exist) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const removeFromCart = (itemName) => {
    setCart((prev) => prev.filter((i) => i.name !== itemName));
  };

  const increaseQty = (itemName) => {
    setCart((prev) =>
      prev.map((i) => (i.name === itemName ? { ...i, qty: i.qty + 1 } : i))
    );
  };

  const decreaseQty = (itemName) => {
    setCart((prev) =>
      prev.map((i) =>
        i.name === itemName ? { ...i, qty: Math.max(i.qty - 1, 1) } : i
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

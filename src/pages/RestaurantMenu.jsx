// src/pages/RestaurantMenu.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { useCart } from "../contexts/CartContext.jsx";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await API.get(`/restaurants/${id}`);
        if (!res.data) {
          setError("Restaurant not found");
          return;
        }
        setRestaurant(res.data);
      } catch (err) {
        console.error("Failed to fetch restaurant:", err);
        setError("Failed to fetch restaurant data");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading menu...</p>;
  if (error) return <p className="text-center mt-4 text-danger">{error}</p>;
  if (!restaurant) return null;

  // Use restaurant.menu instead of items
  const items = restaurant.menu || [];

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">{restaurant.name}</h2>

      {items.length === 0 ? (
        <p className="text-center">No items available in this restaurant.</p>
      ) : (
        <div className="row">
          {items.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={item.image || "/assets/food-placeholder.jpg"}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">₹{item.price}</p>
                  <button
                    className="btn btn-success mt-auto"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;

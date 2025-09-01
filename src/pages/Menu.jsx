// src/pages/Menu.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const Menu = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await API.get("/restaurants");
        setRestaurants(res.data);
      } catch (err) {
        console.error("Failed to fetch restaurants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading restaurants...</p>;
  if (!restaurants.length) return <p className="text-center mt-4">No restaurants available.</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Our Restaurants</h2>
      <div className="row">
        {restaurants.map((res) => (
          <div key={res._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={res.image || "/assets/restaurant-placeholder.jpg"}
                className="card-img-top"
                alt={res.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{res.name}</h5>
                <p className="card-text">{res.description}</p>
                <Link
                  to={`/menu/${res._id}`}
                  className="btn btn-success mt-auto"
                >
                  View Menu
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

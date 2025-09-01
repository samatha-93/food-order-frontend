// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url(/assets/hero-bg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>Delicious Food, Delivered Fast</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>
          Explore a variety of cuisines from the comfort of your home
        </p>
        <Link
          to="/menu"
          className="btn btn-success mt-3"
          style={{ padding: "10px 30px", fontSize: "1rem" }}
        >
          Order Now
        </Link>
      </section>

      {/* About Section */}
      <section className="container my-5 text-center">
        <h2>Welcome to FoodOrder</h2>
        <p style={{ maxWidth: "700px", margin: "auto" }}>
          FoodOrder brings your favorite meals right to your doorstep. We partner
          with the best restaurants in town to make sure you enjoy every bite.
        </p>
      </section>

      {/* Reviews / Testimonials */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2>What Our Customers Say</h2>
          <div className="row mt-4">
            <div className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm">
                <p>"Amazing service and tasty food! Highly recommend."</p>
                <h6>- John Doe</h6>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm">
                <p>"Fast delivery and the food arrived hot. Great experience."</p>
                <h6>- Jane Smith</h6>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm">
                <p>"Variety of cuisines and easy ordering process. Love it!"</p>
                <h6>- Alex Johnson</h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <section className="bg-dark text-white py-4">
        <div className="container text-center">
          <h5>Contact Us</h5>
          <p>Email: <a href="mailto:support@foodorder.com" className="text-white">support@foodorder.com</a> | Phone: +91 1234567890</p>
          <p>© 2025 FoodOrder. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

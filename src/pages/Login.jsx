import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../contexts/AuthContext.jsx";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      const userData = {
        id: res.data.userId,
        name: res.data.name,
        email: res.data.email,
        avatar: res.data.avatar,
        token: res.data.token,
      };

      login(userData);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="form-control mb-2" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="form-control mb-2" required />
        <button className="btn btn-success w-100" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

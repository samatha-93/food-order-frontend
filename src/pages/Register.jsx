import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../contexts/AuthContext.jsx";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", avatar: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/register", form);

      // Backend should return { userId, name, email, avatar, token }
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
      alert(err.response?.data?.message || "Error registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="form-control mb-2" required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="form-control mb-2" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="form-control mb-2" required />
        <input name="avatar" placeholder="Avatar URL" value={form.avatar} onChange={handleChange} className="form-control mb-2" />
        <button className="btn btn-primary w-100" type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>
    </div>
  );
};

export default Register;

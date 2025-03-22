import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import React from "react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Submitted", formData);
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        <div className="logo">
          Photo<span>Hub</span>
        </div>
        <button className="nav-btn" onClick={() => navigate("/signin")}>
          Login
        </button>
      </header>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit" className="primary-btn">
          Register
        </button>
        <p className="auth-switch" onClick={() => navigate("/signin")}>
          Already have an account? <span>Sign in!</span>
        </p>
      </form>
    </div>
  );
}

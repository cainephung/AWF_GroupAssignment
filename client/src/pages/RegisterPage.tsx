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
    console.log("Form Submitted", formData);
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <div className="container">
          <div className="logo">
            Photo<span>Hub</span>
          </div>
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </header>

      <form className="register-form" onSubmit={handleSubmit}>
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
        <input type="email" name="email" value={formData.email} />

        <button type="submit" className="primary-btn">
          Register
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import React from "react";

export default function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Submitted", formData);
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        <div className="logo">
          Photo<span>Hub</span>
        </div>
        <button className="nav-btn" onClick={() => navigate("/register")}>
          Register
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
        <p
          className="forgot-password"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>
        <button type="submit" className="primary-btn">
          Login
        </button>
      </form>
    </div>
  );
}

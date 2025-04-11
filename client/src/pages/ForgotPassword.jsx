import { useState } from "react";
import "../styles/global.css";
import React from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
  };

  return (
    <div className="container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-description">
          Enter your email below and we'll send you instructions to reset your
          password.
        </p>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="primary-btn">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

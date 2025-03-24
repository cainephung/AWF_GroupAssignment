import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import "../../styles/global.css";
import NavBar from "./navbar";
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/signin") navigate("/register");
    else if (
      location.pathname === "/register" ||
      location.pathname === "/forgot-password"
    )
      navigate("/signin");
  };

  const getButtonText = () => {
    if (location.pathname === "/signin") return "Register";
    if (
      location.pathname === "/register" ||
      location.pathname === "/forgot-password"
    )
      return "Login";
    return "";
  };

  return (
    <>
      <header className="auth-header">
        <div className="logo" onClick={() => navigate("/")}>
          Photo<span>Hub</span>
        </div>
        {getButtonText() && (
          <button className="nav-btn" onClick={handleClick}>
            {getButtonText()}
          </button>
        )}
      </header>
      <NavBar />
    </>
  );
}

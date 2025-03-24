// src/components/NavBar.jsx
import { useNavigate } from "react-router-dom";
import React from "react";
import "../../styles/global.css";

export default function NavBar() {
  const navigate = useNavigate();

  const navItems = [
    { label: "Option1", path: "/option1" },
    { label: "Option2", path: "/option2" },
    { label: "Option3", path: "/option3" },
    { label: "Option4", path: "/option3" },
  ];

  return (
    <nav className="main-nav">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path} onClick={() => navigate(item.path)}>
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

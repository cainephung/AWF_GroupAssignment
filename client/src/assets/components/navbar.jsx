// src/components/NavBar.jsx
import { useNavigate } from "react-router-dom";
import React from "react";
import "../../styles/global.css";

// Imports for navbar navigation
import Photos from "../../pages/PhotoPage";
import Albums from "../../pages/AlbumPage";

export default function NavBar() {
  const navigate = useNavigate();

  const navItems = [
    { label: "Photos", path: "/photos" },
    { label: "Album", path: "/albums" },
    { label: "Option3", path: "/option3" },
    { label: "Settings", path: "/option4" },
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

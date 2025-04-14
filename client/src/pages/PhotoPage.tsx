import React, { useState } from "react";
import "../styles/global.css";
import { useNavigate } from "react-router-dom";

// Dummy photos for demonstration
const photos = [
  "Photo1",
  "Photo2",
  "Photo3",
  "Photo4",
  "Photo5",
  "Photo6",
  "Photo7",
  "Photo8",
  "Photo9",
  "Photo10",
];

export default function Photos() {
  // State to track which photos is currently selected
  const [selected, setSelected] = useState("Photo1");
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="container">
      <div className="grid" onMouseLeave={() => setHovered(null)}>
        {photos.map((photo) => (
          <div
            key={photo}
            className={`box ${selected === photo ? "selected" : ""}`}
            onClick={() => setSelected(photo)}
            onMouseEnter={() => setSelected(photo)}
            onDoubleClick={() => navigate(`/photo/${photo.toLowerCase()}`)}
            style={{ position: "relative" }}
          >
            <span className="text">{photo}</span>

            {selected === photo && (
              <div className="preview-overlay">
                <img
                  src={`https://placehold.co/300x200?text=${photo}`}
                  alt={photo}
                  className="preview-image"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="button-row">
        <button className="primary-btn">Upload</button>
        <button className="primary-btn">Share</button>
      </div>
    </div>
  );
}

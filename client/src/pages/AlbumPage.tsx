// imports 
import React, { useState } from "react";
import "../styles/global.css";

// Dummy albums for demonstration will later be replaced with actually albums
const photos = ["Album1", "Album2", "Album3", "Album4", "Album5"];

export default function Albums() {

    // State to track which album is currently selected
    const [selected, setSelected] = useState("Album1");

    return (
        <div className="auth-container">
            <div className="grid">
                {photos.map((photo) => (
                    <div
                        key={photo}
                        className={`box ${selected === photo ? "selected" : ""}`}
                        onClick={() => setSelected(photo)}
                    >
                        <span className="album-text">{photo}</span>
                    </div>
                ))}
            </div>

            <div className="button-row">
                <button className="primary-btn">Create</button>
                <button className="primary-btn">Share</button>
            </div>
        </div>
    );
}

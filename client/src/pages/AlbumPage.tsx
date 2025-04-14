import React, { useState } from "react";
import "../styles/global.css";
import { useNavigate } from "react-router-dom";

// Dummy albums for demonstration
const photos = ["Album1", "Album2", "Album3", "Album4", "Album5"];


export default function Albums() {

    // State to track which albums is currently selected
    const [selected, setSelected] = useState("Album1");

    // useNavigate
    const navigate = useNavigate();

    return (
        <div className="auth-container">
            <div className="center-wrapper">
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
                    <button
                        className="primary-btn"
                        // button navigates towards CreateAlbumPage
                        onClick={() => navigate("/create")}
                    >
                        Create
                    </button>
                    <button className="primary-btn">Share</button>
                </div>
            </div>
        </div>
    );
}

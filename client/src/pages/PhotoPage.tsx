import React, { useState } from "react";
import "../styles/global.css";

const photos = [
    "Photo1", "Photo2", "Photo3", "Photo4", "Photo5",
    "Photo6", "Photo7", "Photo8", "Photo9", "Photo10"
];

export default function Photos() {
    const [selected, setSelected] = useState("Photo1");

    return (
        <div className="auth-container">
            <div className="grid">
                {photos.map((photo) => (
                    <div
                        key={photo}
                        className={`box ${selected === photo ? "selected" : ""}`}
                        onClick={() => setSelected(photo)}
                    >
                        <span className="text">{photo}</span>
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

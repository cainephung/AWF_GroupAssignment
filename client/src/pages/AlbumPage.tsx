import React, { useState } from "react";

// Array Albums
const photos = [
    "Album1", "Album2", "Album3", "Album4", "Album5",
];

export default function Albums() {
    const [selected, setSelected] = useState("Album1");

    return (
        <div className="auth-container">
            <div style={styles.grid}>
                {photos.map((photo) => (
                    <div
                        key={photo}
                        style={{
                            ...styles.photoBox,
                            backgroundColor: selected === photo ? "#777" : "white",
                            color: selected === photo ? "white" : "black",
                        }}
                        onClick={() => setSelected(photo)}
                    >
                        <span style={styles.photoText}>{photo}</span>
                    </div>
                ))}
            </div>

            <div style={styles.buttonRow}>
                <button className="primary-btn">Create</button>
                <button className="primary-btn">Share</button>
            </div>
        </div>
    );
}
const styles = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 150px)",
        gap: "20px",
        justifyContent: "center",
        marginBottom: "40px",
    },
    photoBox: {
        width: "150px",
        height: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "20px",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "0.2s ease",
    },
    photoText: {
        pointerEvents: "none" as const,
    },
    buttonRow: {
        display: "flex",
        gap: "20px",
    },
};
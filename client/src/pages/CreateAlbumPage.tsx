import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

// Dummy photos
const dummyPhotos = [
    "Photo1", "Photo2", "Photo3", "Photo4", "Photo5",
    "Photo6", "Photo7", "Photo8", "Photo9", "Photo10"
];

export default function CreateAlbumPage() {
    const [albumTitle, setAlbumTitle] = useState("");
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
    const navigate = useNavigate();

    const togglePhoto = (photo) => {
        setSelectedPhotos((prev) =>
            prev.includes(photo)
                ? prev.filter((p) => p !== photo)
                : [...prev, photo]
        );
    };

    const handleCreate = () => {
        if (!albumTitle.trim()) {
            alert("Please enter a valid album title.");
            return;
        }
        if (selectedPhotos.length === 0) {
            alert("Please select at least one photo.");
            return;
        }

        console.log("New Album:", {
            title: albumTitle,
            photos: selectedPhotos,
        });

        alert(`Album "${albumTitle}" created with ${selectedPhotos.length} photo(s)!`);
        // navgiate back to /album
        navigate("/");
    };

    return (
        <div className="auth-container">
            <h2 style={styles.pageTitle}>Create Album</h2>

            <input
                style={styles.inputField}
                placeholder="Album Title"
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
            />

            <div className="grid">
                {dummyPhotos.map((photo) => (
                    <div
                        key={photo}
                        className={`box ${selectedPhotos.includes(photo) ? "selected" : ""}`}
                        onClick={() => togglePhoto(photo)}
                    >
                        <span className="album-text">{photo}</span>
                    </div>
                ))}
            </div>

            <button className="primary-btn" onClick={handleCreate}>
                Create Album
            </button>
        </div>
    );
}

const styles: {
    pageTitle: React.CSSProperties;
    inputField: React.CSSProperties;
    container?: React.CSSProperties;
} = {
    pageTitle: {
        color: "#ff8000",
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "12px",
        textAlign: "center",
    },
    inputField: {
        marginTop: "-50x",
        marginBottom: "20px",
        padding: "10px",
        fontSize: "16px",
        width: "300px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
    },
};

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

export default function CreateAlbumPage() {
    const [albumTitle, setAlbumTitle] = useState("");
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
    const [availablePhotos, setAvailablePhotos] = useState<string[]>([]);
    const navigate = useNavigate();
    const userId = "5";

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const res = await fetch(`http://localhost:3000/get_user_images/${userId}`);
                const data = await res.json();
                const base64List = data.map((item: any) => `data:image/png;base64,${item.image}`);
                setAvailablePhotos(base64List);
            } catch (err) {
                console.error("Failed to load photos:", err);
            }
        };

        fetchPhotos();
    }, []);

    const togglePhoto = (photo: string) => {
        setSelectedPhotos((prev) =>
            prev.includes(photo)
                ? prev.filter((p) => p !== photo)
                : [...prev, photo]
        );
    };

    const handleCreate = async () => {
        if (!albumTitle.trim()) {
            alert("Please enter a valid album title.");
            return;
        }
        if (selectedPhotos.length === 0) {
            alert("Please select at least one photo.");
            return;
        }

        try {
            const encodedTitle = encodeURIComponent(albumTitle);

            const res = await fetch(`http://localhost:3000/create_album/${userId}/${encodedTitle}`);
            const data = await res.json();

            const albumId = data.album_id;
            if (!albumId) throw new Error("No album ID returned");

            await fetch("http://localhost:3000/add_images_to_album", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: userId,
                    album_id: albumId,
                    photo_base64_list: selectedPhotos
                }),
            });

            alert(`Album "${albumTitle}" created with ${selectedPhotos.length} photo(s)!`);
            navigate("/");
        } catch (err) {
            console.error("Failed to create album:", err);
            alert("Error creating album");
        }
    };


    return (
        <div className="container">
            <h2 style={styles.pageTitle}>
                <span style={{ color: "#000" }}>Create </span>
                <span style={{ color: "#ff8000" }}>Album</span>
            </h2>

            <input
                style={styles.inputField}
                placeholder="Album Title"
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                    gap: "16px",
                    padding: "20px",
                    width: "100%",
                    maxWidth: "900px",
                    margin: "0 auto",
                }}
            >
                {availablePhotos.map((photo, index) => {
                    const isSelected = selectedPhotos.includes(photo);
                    return (
                        <div
                            key={index}
                            onClick={() => togglePhoto(photo)}
                            style={{
                                border: isSelected ? "4px solid #ff8000" : "1px solid #ccc",
                                boxShadow: isSelected ? "0 0 10px #ff8000" : "none",
                                borderRadius: "8px",
                                overflow: "hidden",
                                cursor: "pointer",
                                transform: isSelected ? "scale(1.05)" : "scale(1)",
                                transition: "all 0.2s ease-in-out",
                            }}
                        >
                            <img
                                src={photo}
                                alt={`Photo ${index}`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        </div>
                    );
                })}
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
} = {
    pageTitle: {
        color: "#ff8000",
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "12px",
        textAlign: "center",
    },
    inputField: {
        marginTop: "-50px",
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

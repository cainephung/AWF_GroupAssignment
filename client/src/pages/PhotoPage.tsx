import React, { useEffect, useState } from "react";
import "../styles/global.css";

export default function Photos() {
    const [photos, setPhotos] = useState<string[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const userId = "5";

    // Load images from DB on component mount
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch(`http://localhost:3000/get_user_images/${userId}`);
                const data = await res.json();
                const base64Photos = data.map((item: any) => `data:image/png;base64,${item.image}`);
                setPhotos(base64Photos);
            } catch (err) {
                console.error("Failed to load photos:", err);
            }
        };

        fetchImages();
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("user_id", userId);
        formData.append("image", file);

        try {
            const res = await fetch("http://localhost:3000/create_image", {
                method: "POST",
                body: formData,
            });

            const data = await res.text();
            console.log("Upload result:", data);

            // Show the uploaded image immediately
            const reader = new FileReader();
            reader.onload = () => {
                setPhotos((prev) => [...prev, reader.result as string]);
                setSelected(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Reset file input
            e.target.value = "";
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    return (
        <div className="container">
            <div className="center-wrapper">
                <div className="grid">
                    {photos.map((photo, idx) => (
                        <div
                            key={idx}
                            className={`box ${selected === photo ? "selected" : ""}`}
                            onClick={() => setSelected(photo)}
                        >
                            <img src={photo} alt={`Uploaded ${idx}`} className="photo-img" />
                        </div>
                    ))}
                </div>

                <div className="button-row">
                    <label htmlFor="file-upload" className="primary-btn" style={{ cursor: "pointer" }}>
                        Upload
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleUpload}
                    />
                    <button className="primary-btn">Share</button>
                </div>
            </div>
        </div>
    );
}

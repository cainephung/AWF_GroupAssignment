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
    };
}

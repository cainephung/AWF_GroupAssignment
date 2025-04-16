import React, { useEffect, useState } from "react";
import "../styles/global.css";
import { useNavigate } from "react-router-dom";

export default function Albums() {
    const [albums, setAlbums] = useState<string[]>([]);
    const navigate = useNavigate();
    const userId = "5";

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await fetch(`http://localhost:3000/get_albums/${userId}`);
                const data = await res.json();
                const albumNames = data.map((item: any) => item.album_name);
                setAlbums(albumNames);
            } catch (err) {
                console.error("Failed to fetch albums:", err);
            }
        };

        fetchAlbums();
    }, []);

    const handleAlbumClick = (albumName: string) => {
        navigate(`/album/${encodeURIComponent(albumName)}`);
    };

    return (
        <div className="container">
            <div className="grid">
                {albums.map((album) => (
                    <div
                        key={album}
                        className="box"
                        onClick={() => handleAlbumClick(album)}
                    >
                        <span className="album-text">{album}</span>
                    </div>
                ))}
            </div>

            <div className="button-row">
                <button
                    className="primary-btn"
                    onClick={() => navigate("/create")}
                >
                    Create
                </button>
                <button className="primary-btn">Share</button>
            </div>
        </div>
    );
}

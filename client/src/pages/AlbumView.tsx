import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/global.css";

const AlbumView = () => {
  const { albumName } = useParams();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {console.error("CALEB attempting fetch now")
        const res = await fetch(`http://localhost:3000/get_album_images/${encodeURIComponent(albumName || "")}`);
        const data = await res.json();
        if (data.images) {
          setImages(data.images);
        }
      } catch (err) {
        console.error("Failed to fetch album images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [albumName]);

  return (
    <div className="container">
      <h2>Album: {albumName}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : images.length === 0 ? (
        <p>No images in this album.</p>
      ) : (
        <div className="grid">
          {images.map((src, index) => (
              <img key={index} src={src} className="album-image" alt={`Album pic ${index}`} style={{ width: "200px", height: "auto", borderRadius: "8px" }} />
          ))}
        </div>
      )}
    </div>
  );
};



export default AlbumView;
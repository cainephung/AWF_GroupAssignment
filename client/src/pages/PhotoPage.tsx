import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

type PhotoItem = {
  id: string;
  dataUrl: string;
  tag: string;
};

export default function Photos() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const userId = "5";

  // Load photos from DB
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/get_user_images/${userId}`
        );
        const data = await res.json();

        const photoList: PhotoItem[] = data.map((item: any) => ({
          id: item.id,
          dataUrl: `data:image/png;base64,${item.image}`,
          tag: "",
        }));

        setPhotos(photoList);
      } catch (err) {
        console.error("Failed to load photos:", err);
      }
    };

    fetchImages();
  }, []);

  // Upload new image
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

      const data = await res.json();
      const newPhoto: PhotoItem = {
        id: data.id, // Assumes backend returns { id }
        dataUrl: `data:image/png;base64,${data.image}`,
        tag: "",
      };

      setPhotos((prev) => [...prev, newPhoto]);
      setSelected(newPhoto.dataUrl);
    } catch (err) {
      console.error("Upload failed:", err);
    }

    e.target.value = "";
  };

  // Update tag locally
  const handleTagChange = (photoId: string, newTag: string) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === photoId ? { ...photo, tag: newTag } : photo
      )
    );
  };

  // Save tag to backend
  const handleTagSave = async (photoId: string, tag: string) => {
    try {
      const res = await fetch("http://localhost:3000/add_tag_to_image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_id: photoId, tag }),
      });

      if (!res.ok) throw new Error("Failed to save tag");
      console.log(`Tag saved for ${photoId}: ${tag}`);
    } catch (err) {
      console.error("Error saving tag:", err);
    }
  };

  return (
    <div className="container">
      <div className="grid" onMouseLeave={() => setHovered(null)}>
        {photos.map((photo, idx) => (
          <div
            key={photo.id}
            className={`box ${selected === photo.dataUrl ? "selected" : ""}`}
            onClick={() => setSelected(photo.dataUrl)}
            onMouseEnter={() => setHovered(photo.dataUrl)}
            onDoubleClick={() => navigate(`/photo/${photo.id}`)}
            style={{ position: "relative" }}
          >
            {hovered === photo.dataUrl && (
              <div className="preview-overlay">
                <img
                  src={photo.dataUrl}
                  alt={`Preview ${idx}`}
                  className="preview-image"
                />
              </div>
            )}
            <img
              src={photo.dataUrl}
              alt={`Uploaded ${idx}`}
              className="photo-img"
            />

            <div className="tag-input">
              <input
                type="text"
                placeholder="Add tag"
                value={photo.tag}
                onChange={(e) => handleTagChange(photo.id, e.target.value)}
              />
              <button onClick={() => handleTagSave(photo.id, photo.tag)}>
                Save
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="button-row">
        <label
          htmlFor="file-upload"
          className="primary-btn"
          style={{ cursor: "pointer" }}
        >
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
  );
}

// DisplayPhoto.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/global.css";

export default function DisplayPhoto() {
  const { name } = useParams();
  const photoName = (name ?? "unnamed").toLowerCase();
  const navigate = useNavigate();
  const storageKey = `tags-${photoName}`;

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [hasLoadedTags, setHasLoadedTags] = useState(false);

  // Load saved tags
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    console.log("Loading tags from:", storageKey, saved);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTags(parsed);
        }
      } catch (err) {
        console.error("Could not parse saved tags:", err);
      }
    }
    setHasLoadedTags(true);
  }, [storageKey]);

  // Save tags only if loaded first
  useEffect(() => {
    if (hasLoadedTags) {
      console.log("Saving tags to:", storageKey, tags);
      localStorage.setItem(storageKey, JSON.stringify(tags));
    }
  }, [tags, hasLoadedTags, storageKey]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px", marginTop: "100px" }}>{photoName}</h2>

      <img
        src={`https://placehold.co/600x400?text=${photoName}`}
        alt={photoName}
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      />

      <div className="tag-badges">
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
            <button className="remove-tag" onClick={() => removeTag(tag)}>
              ×
            </button>
          </span>
        ))}
      </div>

      <input
        className="tag-input"
        placeholder="Add tag and press Enter"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ marginTop: "10px" }}
      />

      <button
        onClick={() => navigate("/Photos")}
        className="primary-btn"
        style={{ marginTop: "20px" }}
      >
        Back
      </button>
    </div>
  );
}

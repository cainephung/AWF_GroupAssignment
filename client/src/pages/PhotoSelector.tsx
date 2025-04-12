import React, { useState } from "react";

// Array photo
const photos = [
    "Photo1", "Photo2", "Photo3", "Photo4", "Photo5",
    "Photo6", "Photo7", "Photo8", "Photo9", "Photo10"
];

export default function PhotoSelector() {
    const [selected, setSelected] = useState("Photo1");

    return (
        <div>
            {photos.map((photo) => (
                <div key={photo} onClick={() => setSelected(photo)}>
                    {photo}
                </div>
            ))}
        </div>
    );
}

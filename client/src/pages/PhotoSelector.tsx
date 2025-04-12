import React, { useState } from "react";

export default function PhotoSelector() {
    return <div>Photo Selector Page</div>;
}
// Add photo array
const photos = [
    "Photo1", "Photo2", "Photo3", "Photo4", "Photo5",
    "Photo6", "Photo7", "Photo8", "Photo9", "Photo10"
];

const [selected, setSelected] = useState("Photo1");

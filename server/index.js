const express = require("express");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const { neon } = require("@neondatabase/serverless");

const settings = require("./settings.json");
const app = express();
const port = 3000;
const upload = multer({ storage: multer.memoryStorage() });
const sql = neon(CONNECTION_STRING);

app.use(cors());
app.use(express.json());


const {
  createUser,
  selectUserById,
  deleteUserById,

  createImage,
  selectImageById,
  selectManyImageById,
  deleteImageById,

  createAlbum,
  selectImageIdByAlbumId,
  deleteAlbumById,
  addImageToAlbum,

  createTag,
  selectImageIdByTagId,
  deleteTagById,
  addTagToImage,

  testConnection,
} = require("./scripts/database");

// Debug route
app.get("/", async (req, res) => {
  if (!settings.DEBUG) return res.sendStatus(404);
  res.json(await testConnection());
});

// Users API
app.get("/create_user/:identifier/:user_name", async (req, res) => {
  const { identifier, user_name } = req.params;
  const result = await createUser(identifier, user_name);
  res.json(result);
});

app.get("/get_user_images/:user_id", async (req, res) => {
  const userId = req.params.user_id;

  try {
    const result =
      await sql`SELECT image FROM images WHERE user_id = ${userId}`;
    const images = result.map((row) => ({
      image: row.image?.toString("base64") ?? null,
    }));
    res.json(images);
  } catch (err) {
    console.error("Failed to fetch user images:", err);
    res.status(500).send("Failed to fetch user images");
  }
});

app.get("/delete_user/:user_id", async (req, res) => {
  const result = await deleteUserById(req.params.user_id);
  res.json(result);
});

// Images API
app.post("/create_image", upload.single("image"), async (req, res) => {
  const { user_id } = req.body;
  const imageBuffer = req.file?.buffer;

  if (!user_id || !imageBuffer) {
    return res.status(400).send("Missing user_id or image");
  }

  try {
    await createImage(user_id, imageBuffer);
    res.send("Image uploaded to DB");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to store image");
  }
});

app.get("/get_many_image/:image_ids", async (req, res) => {
  const result = await selectImageById(req.params.image_ids);
  res.json(result);
});

app.get("/delete_image/:image_id", async (req, res) => {
  const result = await deleteImageById(req.params.image_id);
  res.json(result);
});

// Create Album
app.get("/create_album/:user_id/:album_name", async (req, res) => {
  try {
    const { user_id, album_name } = req.params;
    const album_id = await createAlbum(user_id, album_name);
    res.json({ album_id });
  } catch (err) {
    console.error("Error creating album:", err);
    res.status(500).json({ error: "Failed to create album" });
  }
});

app.post("/add_images_to_album", async (req, res) => {
  const { user_id, album_id, photo_base64_list } = req.body;

  try {
    for (const photo of photo_base64_list) {
      const base64Data = photo.replace(/^data:image\/\w+;base64,/, ""); // remove data:image/png;base64,
      const buffer = Buffer.from(base64Data, "base64");

      // Insert image and get the ID
      const inserted = await sql`
        INSERT INTO images (user_id, image)
        VALUES (${user_id}, ${buffer})
        RETURNING image_id;
      `;
      const imageId = inserted[0].image_id;

      // Associate with album
      await sql`
        INSERT INTO image_album (album_id, image_id)
        VALUES (${album_id}, ${imageId});
      `;
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error in /add_images_to_album:", err);
    res.status(500).json({ error: "Failed to insert and associate images." });
  }
});

// Album viewer
app.get("/get_albums/:user_id", async (req, res) => {
  try {
    const result = await sql`SELECT album_name FROM albums WHERE user_id = ${req.params.user_id}`;
    res.json(result.map(r => ({ album_name: r.album_name })));
  } catch (err) {
    console.error("Failed to fetch albums:", err);
    res.status(500).send("Failed to load albums");
  }
});

app.get("/get_album_images/:album_name", async (req, res) => {
  try {
    const { album_name } = req.params;

    // Step 1: Get album_id
    const album = await sql`
      SELECT album_id FROM albums WHERE album_name = ${album_name}
    `;
    if (album.length === 0) {
      return res.status(404).json({ error: "Album not found" });
    }
    const album_id = album[0].album_id;

    // Step 2: Get image_id associated with the album
    const imageIdRow = await sql`
      SELECT image_id FROM image_album WHERE album_id = ${album_id}
    `;

    // If no image_id found for this album
    if (imageIdRow.length === 0) {
      return res.json({ images: [] });
    }

    // Step 3: Loop through each image_id, fetch and convert image
    const base64Images = [];

    for (const row of imageIdRow) {
      const imageId = row.image_id;

      const imageResult = await sql`
        SELECT image FROM images WHERE image_id = ${imageId}
      `;

      if (imageResult.length === 0) {
        console.warn(`Image not found for image_id ${imageId}`);
        continue; // Skip this one and keep going
      }

      const buffer = imageResult[0].image;
      const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;
      base64Images.push(base64Image);
    }

// Step 4: Send back all images
res.json({ images: base64Images });

  } catch (err) {
    console.error("Error in /get_album_images:", err);
    res.status(500).json({ error: "Failed to get album images." });
  }
});

app.get("/get_albums/:user_id", async (req, res) => {
  try {
    const result =
      await sql`SELECT album_name FROM albums WHERE user_id = ${req.params.user_id}`;
    res.json(result.map((r) => ({ album_name: r.album_name })));
  } catch (err) {
    console.error("Failed to fetch albums:", err);
    res.status(500).send("Failed to load albums");
  }
});

app.get("/get_album_imageIds/:album_id", async (req, res) => {
  const result = await selectImageIdByAlbumId(req.params.album_id);
  res.json(result);
});

app.get("/delete_album/:album_id", async (req, res) => {
  const result = await deleteAlbumById(req.params.album_id);
  res.json(result);
});

app.get("/add_image_album/:album_id/:image_id", async (req, res) => {
  const result = await addImageToAlbum(
    req.params.album_id,
    req.params.image_id
  );
  res.json(result);
});

// Tags API
app.get("/create_tag/:user_id/:tag_name", async (req, res) => {
  const result = await createTag(req.params.user_id, req.params.tag_name);
  res.json(result);
});

app.get("/get_tag_imageIds/:tag_id", async (req, res) => {
  const result = await selectImageIdByTagId(req.params.tag_id);
  res.json(result);
});

app.get("/delete_tag/:tag_id", async (req, res) => {
  const result = await deleteTagById(req.params.tag_id);
  res.json(result);
});

app.get("/add_image_tag/:tag_id/:image_id", async (req, res) => {
  const result = await addTagToImage(req.params.tag_id, req.params.image_id);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
